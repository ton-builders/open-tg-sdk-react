import {Telegram} from "./types";


declare global {
    interface Window {
        Telegram?: Telegram;
    }
}