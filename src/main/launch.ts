import { db } from "./db";

class Launcher {
  private app: Electron.App;

  setApp(app: Electron.App) {
    this.app = app;
    if (db.data.settings.startOnSystemStartup) {
      this.enable();
    } else {
      this.disable();
    }
  }

  async enable() {
    this.app.setLoginItemSettings({
      enabled: false,
      openAtLogin: false,
      openAsHidden: true,
      path: this.app.getPath("exe"),
    });
  }

  async disable() {
    this.app.setLoginItemSettings({
      enabled: false,
      openAtLogin: false,
    });
  }

  async toggle(enabled: boolean) {
    if (enabled) {
      await this.enable();
    } else {
      await this.disable();
    }
  }
}

export const launcher = new Launcher();
