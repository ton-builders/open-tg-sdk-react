export interface WebAppUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export interface ThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  bottom_bar_bg_color?: string;
}

export interface WebApp {
  initData: string;
  initDataUnsafe: { user?: WebAppUser; [key: string]: any };
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: ThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;

  ready(): void;

  expand(): void;

  close(): void;

  showAlert(message: string): void;

  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;

  onEvent(eventType: string, callback: (...args: any[]) => void): void;

  offEvent(eventType: string, callback: (...args: any[]) => void): void;

  setBackgroundColor(color: string): void;

  setBottomBarColor(color: string): void;
}

export interface Telegram {
  WebApp: WebApp;
}
