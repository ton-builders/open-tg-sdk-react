import { useEffect, useState } from "react";
import { useTelegram } from "./provider";
import { ThemeParams } from "./types";

export function useThemeParams(): ThemeParams | undefined {
  const { webApp } = useTelegram();
  const [themeParams, setThemeParams] = useState<ThemeParams | undefined>(
    webApp?.themeParams,
  );

  useEffect(() => {
    if (!webApp) return;

    const updateTheme = () => setThemeParams(webApp.themeParams);
    updateTheme();
    webApp.onEvent("themeChanged", updateTheme);
    return () => webApp.offEvent("themeChanged", updateTheme);
  }, [webApp]);

  return themeParams;
}
