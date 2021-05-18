"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var airgram_1 = require("airgram");
var airgram = new airgram_1.Airgram({
    apiId: 4944464,
    apiHash: "580e246102cc186e621f5a2408ee8883",
    command: process.env.TDLIB_COMMAND,
    logVerbosityLevel: 2
});
airgram.use(new airgram_1.Auth({
    code: function () { return airgram_1.prompt("Please enter the secret code:\n"); },
    phoneNumber: function () { return airgram_1.prompt("Please enter your phone number:\n"); }
}));
void (function () { return __awaiter(void 0, void 0, void 0, function () {
    var me, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = airgram_1.toObject;
                return [4 /*yield*/, airgram.api.getMe()];
            case 1:
                me = _a.apply(void 0, [_b.sent()]);
                console.log("[Me] ", me);
                return [2 /*return*/];
        }
    });
}); });
void (function () {
    return __awaiter(this, void 0, void 0, function () {
        var chats, _a, _i, _b, chatId, chat, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = airgram_1.toObject;
                    return [4 /*yield*/, airgram.api.getChats({
                            limit: 50,
                            offsetChatId: 0,
                            offsetOrder: "9223372036854775807"
                        })];
                case 1:
                    chats = _a.apply(void 0, [_d.sent()]);
                    _i = 0, _b = chats.chatIds;
                    _d.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 5];
                    chatId = _b[_i];
                    _c = airgram_1.toObject;
                    return [4 /*yield*/, airgram.api.getChat({ chatId: chatId })];
                case 3:
                    chat = _c.apply(void 0, [_d.sent()]);
                    console.log({ title: chat.title, id: chat.id });
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
})();
var chatIds = {
    silvia: 458927470,
    emiliano: 1679449259,
    mrTrader: -1001297147664,
    alertsGroup: -1001275407084,
    translator: 104784211,
    tradingLatino: -1001248439400
};
airgram.on("updateChatPhoto", function (_a) {
    var update = _a.update;
    return __awaiter(void 0, void 0, void 0, function () {
        var chatId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    chatId = update.chatId;
                    if (!(chatId === chatIds.tradingLatino)) return [3 /*break*/, 3];
                    console.log('Message received from tradingLatino');
                    return [4 /*yield*/, airgram.api.getChats({
                            limit: 50,
                            offsetChatId: 0,
                            offsetOrder: "9223372036854775807"
                        })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, airgram.api.sendMessage({
                            chatId: chatIds.alertsGroup,
                            inputMessageContent: {
                                _: "inputMessageText",
                                text: {
                                    _: "formattedText",
                                    text: "Nuevo mensaje de Jaime"
                                }
                            }
                        })];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
var handleTranslatorMsg = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var content, messagePayload, sendMessageResponse, sendMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = message.content;
                return [4 /*yield*/, airgram.api.getChat({ chatId: chatIds.alertsGroup })];
            case 1:
                _a.sent();
                messagePayload = {
                    chatId: chatIds.alertsGroup,
                    inputMessageContent: {
                        _: "inputMessageText",
                        text: {
                            _: "formattedText",
                            // @ts-ignore
                            text: content.text.text
                        }
                    }
                };
                return [4 /*yield*/, airgram.api.sendMessage(messagePayload)];
            case 2:
                sendMessageResponse = _a.sent();
                if (!(sendMessageResponse.response.code === 5)) return [3 /*break*/, 5];
                return [4 /*yield*/, airgram.api.createPrivateChat({ userId: chatIds.alertsGroup })];
            case 3:
                _a.sent();
                return [4 /*yield*/, airgram.api.sendMessage(messagePayload)];
            case 4:
                sendMessage = _a.sent();
                console.log("[private]", sendMessage);
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
var handleMrTraderMsg = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var content, messagePayload, sendMessageResponse, sendMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = message.content;
                return [4 /*yield*/, airgram.api.getChat({ chatId: chatIds.translator })];
            case 1:
                _a.sent();
                messagePayload = {
                    chatId: chatIds.translator,
                    inputMessageContent: {
                        _: "inputMessageText",
                        text: {
                            _: "formattedText",
                            text: content.text.text
                        }
                    }
                };
                return [4 /*yield*/, airgram.api.sendMessage(messagePayload)];
            case 2:
                sendMessageResponse = _a.sent();
                if (!(sendMessageResponse.response.code === 5)) return [3 /*break*/, 5];
                return [4 /*yield*/, airgram.api.createPrivateChat({ userId: chatIds.translator })];
            case 3:
                _a.sent();
                return [4 /*yield*/, airgram.api.sendMessage(messagePayload)];
            case 4:
                sendMessage = _a.sent();
                console.log("[private]", sendMessage);
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
// Getting new messages
airgram.on("updateNewMessage", function (_a) {
    var update = _a.update;
    return __awaiter(void 0, void 0, void 0, function () {
        var message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    message = update.message;
                    if (!(message.chatId === chatIds.translator)) return [3 /*break*/, 2];
                    console.log('Message received from translator');
                    return [4 /*yield*/, handleTranslatorMsg(message)];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    if (!(message.chatId === chatIds.mrTrader)) return [3 /*break*/, 4];
                    console.log('Message received from MrTrader');
                    return [4 /*yield*/, handleMrTraderMsg(message)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
