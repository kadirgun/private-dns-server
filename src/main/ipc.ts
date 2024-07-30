import { ipcMain } from "electron";
import { db } from "./db";
import { dnsServer } from "./server/dns";
import { launcher } from "./launch";

export const handleIPC = () => {
  ipcMain.handle("ping", async () => {
    return "pong";
  });

  ipcMain.handle("records.add", async (event, record: DNSRecord) => {
    record.id = db.data.records.length + 1;
    db.update(({ records }) => records.push(record));
  });

  ipcMain.handle("records.list", async () => {
    return db.data.records;
  });

  ipcMain.handle("records.update", async (event, record: DNSRecord) => {
    db.update(({ records }) => {
      const index = records.findIndex((r) => r.id === record.id);
      records[index] = record;
    });
  });

  ipcMain.handle("records.delete", async (event, id: number) => {
    db.update(({ records }) => {
      const index = records.findIndex((r) => r.id === id);
      records.splice(index, 1);
    });
  });

  ipcMain.handle("settings.get", async () => {
    return db.data.settings;
  });

  ipcMain.handle("settings.set", async (event, settings: Settings) => {
    const shouldRestartDNSServer = settings.dnsIPAddress !== db.data.settings.dnsIPAddress;
    const shouldChangeLaunchAtStartup = settings.startOnSystemStartup !== db.data.settings.startOnSystemStartup;

    db.update(() => {
      db.data.settings = settings;
    });

    if (shouldRestartDNSServer) {
      dnsServer.restart();
    }

    if (shouldChangeLaunchAtStartup) {
      launcher.toggle(settings.startOnSystemStartup);
    }
  });
};
