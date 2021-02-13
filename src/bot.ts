import {Client, Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string
    ) {
        this.client = client;
        this.token = token;
    }

    public async listen(): Promise<string> {
        await this.client.on('message', (message: Message): void => {
            console.log("Message received! Contents: ", message.content);
            const prefix = "!";

            if (message.author.bot) {
                return;
            }
            if (!message.content.startsWith(prefix)) {
                return;
            }

            const commandBody = message.content.slice(prefix.length);
            const args = commandBody.split(' ');
            const command = args.shift()!.toLowerCase();
            if (command === "ping") {
                const timeTaken = Date.now() - message.createdTimestamp;
                message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
            } else {
                message.reply(`Command: ${command} is not a known command. Please try again`);
            }
        });

        return this.client.login(this.token);
    }
}
