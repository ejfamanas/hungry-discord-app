import "reflect-metadata";
import 'mocha';
import {expect} from 'chai';
import {instance, mock, verify, when} from "ts-mockito";
import {Message} from "discord.js";
import {MessageResponder} from "../../src/services/message-responder";
import {PingHandler} from "../../src/services/ping-handler";
import {HelpHandler} from "../../src/services/help-handler";

describe('MessageResponder', () => {
    const NON_EMPTY_STRING = "Non-empty string";
    let mockedPingHandlerClass: PingHandler;
    let mockedPingHandlerInstance: PingHandler;
    let mockedHelpHandlerClass: HelpHandler;
    let mockedHelpHandlerInstance: HelpHandler;
    let mockedMessageClass: Message;
    let mockedMessageInstance: Message;

    let service: MessageResponder;

    beforeEach(() => {
        mockedPingHandlerClass = mock(PingHandler);
        mockedPingHandlerInstance = instance(mockedPingHandlerClass);
        mockedHelpHandlerClass = mock(HelpHandler);
        mockedHelpHandlerInstance = instance(mockedHelpHandlerClass)
        mockedMessageClass = mock(Message);
        mockedMessageInstance = instance(mockedMessageClass);
        setMessageContents();

        service = new MessageResponder(mockedPingHandlerInstance, mockedHelpHandlerInstance);
    })

    it('should reply to ping', async () => {
        whenIsPingThenReturn(true);

        await service.handle(mockedMessageInstance);

        verify(mockedMessageClass.reply(PingHandler.pong)).once();
    });

    it('should not reply to ping', async () => {
        whenIsPingThenReturn(false);

        await service.handle(mockedMessageInstance).then(() => {
            // Successful promise is unexpected, so we fail the test
            expect.fail('Unexpected promise');
        }).catch(() => {
            // Rejected promise is expected, so nothing happens here
        });

        verify(mockedMessageClass.reply(PingHandler.pong)).never();
    });

    it('should reply to help', async () => {
        whenIsHelpThenReturn(true);

        await service.handle(mockedMessageInstance);

        verify(mockedMessageClass.reply(HelpHandler.help)).once();
    });

    it('should not reply to help', async () => {
        whenIsHelpThenReturn(false);

        await service.handle(mockedMessageInstance).then(() => {
            // Successful promise is unexpected, so we fail the test
            expect.fail('Unexpected promise');
        }).catch(() => {
            // Rejected promise is expected, so nothing happens here
        });

        verify(mockedMessageClass.reply(HelpHandler.help)).never();
    });

    function setMessageContents() {
        mockedMessageInstance.content = NON_EMPTY_STRING;
    }

    function whenIsPingThenReturn(result: boolean) {
        when(mockedPingHandlerClass.isPing(NON_EMPTY_STRING)).thenReturn(result);
    }

    function whenIsHelpThenReturn(result: boolean) {
        when(mockedHelpHandlerClass.isHelp(NON_EMPTY_STRING)).thenReturn(result);
    }
});
