import type { BrowserWindow } from "electron";

class Logger {
  private browser: BrowserWindow;

  log(message: string) {
    console.log(message);

    if (this.browser) {
      this.browser.webContents.send("log", `[${new Date().toISOString()}] ${message}`);
    }
  }

  setBrowser(browser: BrowserWindow) {
    this.browser = browser;
  }
}

export const logger = new Logger();
