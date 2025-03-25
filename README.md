# 说明

演示如何将 TG JS SDK 包装成 React SDK。

> 不要用于生产环境。
>

> 本演示 SDK 已经发布为 `@ton-builders/open-tg-sdk-react`
> https://www.npmjs.com/package/@ton-builders/open-tg-sdk-react

# Usage

```JavaScript
import {TelegramProvider, useTelegram} from '@ton-builders/open-tg-sdk-react';

const App = () => {
    const {webApp} = useTelegram();
    return <div>{webApp?.initDataUnsafe.user?.first_name
    }
    </div>;
};

export default () => <TelegramProvider>
    <App / >
</TelegramProvider>
;

```