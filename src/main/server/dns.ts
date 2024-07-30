import dgram from "dgram";
import dns from "dns-packet";
import { db } from "~/main/db";
import { logger } from "../logger";

class DNSServer {
  private server: dgram.Socket;

  start() {
    this.server = dgram.createSocket("udp4");

    this.server.on("error", (err) => {
      console.error(`server error:\n${err.stack}`);
      this.server.close();
    });

    this.server.on("message", async (data, rinfo) => {
      const message = dns.decode(data);

      logger.log(
        `server got: ${message.questions[0].name} ${message.questions[0].type} from ${rinfo.address}:${rinfo.port}`
      );

      const questions = [];
      const answers: dns.Answer[] = [];

      for (const question of message.questions) {
        const answer = this.findAnswer(question);

        if (answer) {
          answers.push(answer);
        } else {
          questions.push(question);
        }
      }

      if (questions.length > 0) {
        const fallbacks = await this.fallbackDoH({
          ...message,
          questions,
        });

        answers.push(...fallbacks);
      }

      const response = dns.encode({
        id: message.id,
        type: "response",
        flags: dns.AUTHORITATIVE_ANSWER,
        questions: message.questions,
        answers,
      });

      this.server.send(response, rinfo.port, rinfo.address, (err) => {
        if (err) {
          console.error(`server send error:\n${err.stack}`);
          this.server.close();
        }
      });
    });

    this.server.on("listening", () => {
      const address = this.server.address();
      console.log(`server listening ${address.address}:${address.port}`);
    });

    this.server.bind(53, "127.1.1.1");
  }

  stop() {
    this.server.close();
  }

  restart() {
    this.stop();
    this.start();
  }

  async fallbackDoH(message: dns.DecodedPacket) {
    const domain = db.data.settings.dnsFallbackDoHDomain;
    const url = `https://${domain}/dns-query`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/dns-message",
      },
      body: dns.encode(message),
    });

    const data = await response.arrayBuffer();

    const decoded = dns.decode(Buffer.from(data));

    return decoded.answers;
  }

  makeAnswer(record: DNSRecord): dns.StringAnswer {
    return {
      name: record.domain,
      type: record.type,
      class: "IN",
      ttl: record.ttl,
      data: record.value,
    };
  }

  findAnswer(question: dns.Question) {
    for (const record of db.data.records) {
      if (record.domain === question.name) {
        return this.makeAnswer(record);
      }
    }

    const baseDomain = question.name.split(".").slice(1).join(".");

    for (const record of db.data.records) {
      if (record.domain === `*.${baseDomain}`) {
        return this.makeAnswer(record);
      }
    }

    return null;
  }
}

export const dnsServer = new DNSServer();
