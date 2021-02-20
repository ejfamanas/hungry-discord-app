import "reflect-metadata";
import 'mocha';
import {expect} from 'chai';
import {PingHandler} from "../../src/services/ping-handler";

describe('PingHandler', () => {
    let service: PingHandler;
    beforeEach(() => {
        service = new PingHandler();
    });

    it('should find "ping" in the string', () => {
        expect(service.isPing("ping")).to.be.true;
    });
});
