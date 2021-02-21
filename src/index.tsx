import container from "./inversify.config";
import {TYPES} from "./types";
import {Bot} from "./bot";
import HTML = Mocha.reporters.HTML;
let bot = container.get<Bot>(TYPES.Bot);
bot.listen().then(() => {
    console.log('Logged in!')
}).catch((error) => {
    console.log('Oh no! ', error)
});

// @ts-ignore
document.append((<div>Hello world</div>) as HTMLElement);
