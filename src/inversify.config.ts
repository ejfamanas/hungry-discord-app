import "reflect-metadata";
import {Container} from "inversify";
import {Bot} from "./bot";
import {Client} from "discord.js";
import {TYPES} from "./types";
import {MessageResponder} from "./services/message-responder";
import {PingHandler} from "./services/ping-handler";
import {HelpHandler} from "./services/help-handler";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN!);
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<PingHandler>(TYPES.PingFinder).to(PingHandler).inSingletonScope();
container.bind<HelpHandler>(TYPES.HelpFinder).to(HelpHandler).inSingletonScope();

export default container;
