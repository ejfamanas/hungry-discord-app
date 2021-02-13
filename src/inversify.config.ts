import "reflect-metadata";
import {Container} from "inversify";
import {Bot} from "./bot";
import {Client} from "discord.js";
import {TYPES} from "./types";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.DISCORD_BOT_TOKEN);

export default container;