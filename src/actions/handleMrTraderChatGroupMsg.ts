import { chatIds } from "../constants";
import { translate } from "../services/translator";

const handleMrTraderChatGroupMsg = async (airgram: any, message: any) => {
  const { content } = message;

  console.log("[handleMrTraderChatGroupMsg]", { content });

  await airgram.api.getChat({ chatId: chatIds.mrTraderChatGroupInternal });
  const originalText =
    content._ === "messagePhoto" ? content.caption.text : content.text?.text;

  if (!originalText) return

  const translatedTextEn = await translate({ text: originalText, from: 'tr', to: 'en' });
  const translatedTextEs = await translate({ text: originalText, from: 'tr', to: 'es' });

  const senderInfo = await airgram.api.getUser({ userId: message.sender.userId })
  const senderStr = senderInfo.response.username.substring(0, 10)
  const messagePayload = {
    chatId: chatIds.mrTraderChatGroupInternal,
    inputMessageContent: {
      _: "inputMessageText",
      text: {
        _: 'formattedText',
        text: `${senderStr.padEnd(10, '...')}: \n${translatedTextEs} // ${translatedTextEn}`,
        entities: [
          { _: 'textEntity', offset: 0, length: 10, type: { _: 'textEntityTypeCode' } }
        ]
      },
    },
  };

  // @ts-ignore
  const sendMessageResponse = await airgram.api.sendMessage(messagePayload);

  // @ts-ignore
  if (sendMessageResponse.response.code === 5) {
    await airgram.api.createPrivateChat({ userId: chatIds.mrTraderChatGroupInternal });
    // @ts-ignore
    const sendMessage = await airgram.api.sendMessage(messagePayload);
    console.log("[private]", sendMessage);
  }
};

export default handleMrTraderChatGroupMsg;
