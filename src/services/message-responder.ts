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
        if (message.content.includes("$whoami")) {
            const {username} = message.author;
            return message.reply(username === "fanman"
                ? `${username} is the greatest`
                : `${username} is also the greatest`);
        }
        return Promise.reject();
    }
}
