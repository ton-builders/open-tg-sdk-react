import React, { createContext, useContext, useEffect, useState } from "react";
import { telegramSDK } from "./core";
import { WebApp } from "./types";

interface TelegramContextValue {
  webApp: WebApp | null;
  isLoading: boolean;
  error: Error | null;
}

const TelegramContext = createContext<TelegramContextValue>({
  webApp: null,
  isLoading: true,
  error: null,
});

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [webApp, setWebApp] = useState<WebApp | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    telegramSDK
      .init()
      .then((app) => {
        setWebApp(app);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <TelegramContext.Provider value={{ webApp, isLoading, error }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
