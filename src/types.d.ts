interface IPCAPI {
  invoke: typeof import("electron").ipcRenderer.invoke;
  send: typeof import("electron").ipcRenderer.send;
  on: typeof import("electron").ipcRenderer.on;
  off: typeof import("electron").ipcRenderer.off;
}

declare const ipc: IPCAPI;

type DNSRecord = {
  id: number;
  domain: string;
  type: import("dns-packet").StringRecordType;
  value: string;
  ttl: number;
};

type Settings = {
  dnsIPAddress: string;
  dnsFallbackDoHDomain: string;
  startOnSystemStartup: boolean;
  startAsHidden: boolean;
};

declare module "*.png";
