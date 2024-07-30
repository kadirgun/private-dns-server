import { JSONFileSyncPreset } from "lowdb/node";

export type StoreData = {
  records: DNSRecord[];
  settings: Settings;
};

export const db = JSONFileSyncPreset<StoreData>("db.json", {
  records: [],
  settings: {
    dnsIPAddress: "127.1.1.1",
    dnsFallbackDoHDomain: "cloudflare-dns.com",
    startOnSystemStartup: true,
    startAsHidden: false,
  },
});
