import { Telegram } from "./types";

declare global {
  interface Window {
    Telegram?: Telegram;
  }
}

export class TelegramSDK {
  private scriptUrl = "https://telegram.org/js/telegram-web-app.js?56";
  private webApp: Telegram["WebApp"] | null = null;
  private isLoaded = false;

  constructor() {
    this.loadScript();
  }

  private loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.Telegram?.WebApp) {
        this.webApp = window.Telegram.WebApp;
        this.isLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = this.scriptUrl;
      script.async = true;
      script.onload = () => {
        this.webApp = window.Telegram?.WebApp || null;
        this.isLoaded = this.webApp !== null;
        if (this.isLoaded) resolve();
        else reject(new Error("Failed to load Telegram WebApp"));
      };
      script.onerror = () => reject(new Error("Script load error"));
      document.head.appendChild(script);
    });
  }

  public async init(): Promise<Telegram["WebApp"]> {
    if (this.isLoaded) return this.webApp!;
    await this.loadScript();
    if (!this.webApp) throw new Error("Telegram WebApp not available");
    this.webApp.ready();
    return this.webApp;
  }

  public getWebApp(): Telegram["WebApp"] | null {
    return this.webApp;
  }
}

export const telegramSDK = new TelegramSDK();
