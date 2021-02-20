import {Message} from "discord.js";
import {PingHandler} from "./ping-handler";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {HelpHandler} from "./help-handler";

@injectable()
export class MessageResponder {
    private readonly pingHandler: PingHandler;
    private readonly helpHandler: HelpHandler;

    constructor(
        @inject(TYPES.PingFinder) pingHandler: PingHandler,
        @inject(TYPES.HelpFinder) helpHandler: HelpHandler
    ) {
        this.pingHandler = pingHandler;
        this.helpHandler = helpHandler;
    }

    public handle(message: Message): Promise<Message | Message[]> {
        if (this.pingHandler.isPing(message.content)) {
            return message.reply(PingHandler.pong);
        }
        if (this.helpHandler.isHelp(message.content)) {
            return message.reply(HelpHandler.help)
        }
        return Promise.reject();
    }
}
