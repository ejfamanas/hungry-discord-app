import {injectable} from "inversify";

@injectable()
export class HelpHandler {
    private regexp = "help";

    public isHelp(stringToSearch: string): boolean {
        return stringToSearch.search(this.regexp) >= 0;
    }

    public static help = "use the $ symbol before each command";
}
