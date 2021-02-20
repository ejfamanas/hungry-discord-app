import "reflect-metadata";
import 'mocha';
import {expect} from 'chai';
import {HelpHandler} from "../../src/services/help-handler";

describe("HelpHandler", () => {
    let service: HelpHandler;
    beforeEach(() => {
        service = new HelpHandler();
    });
    it('should find "ping" in the string', () => {
        expect(service.isHelp("help")).to.be.true;
    });
});
