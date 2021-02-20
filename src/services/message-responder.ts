import {Message} from "discord.js";
import {PingFinder} from "./ping-finder";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";

@injectable()
export class MessageResponder {
    private pingFinder: PingFinder;

    constructor(
        @inject(TYPES.PingFinder) pingFinder: PingFinder
    ) {
        this.pingFinder = pingFinder;
    }

    handle(message: Message): Promise<Message | Message[]> {
        if (this.pingFinder.isPing(message.content)) {
            return message.reply('pong!');
        }
        if (message.content.includes("whoami")) {
            const {username} = message.author;
            return message.reply(username === "fanman"
                ? `${username} is my name`
                : username === "Always Hungry" || "Si2S0lo"
                    ? `${username} is also my name`
                : `${username} change your name`);
        }
        if (message.content.includes("give me a square")) {
            const {username} = message.author;
            return message.reply(username === "fanman"
                ? `gives ${username} a square`
                : username === "Always Hungry" || "Si2S0lo" || "Tony V"
                    ? `bums ${username} a square`
                    : `${username} change your name`);
        }
        return Promise.reject();
    }
}
