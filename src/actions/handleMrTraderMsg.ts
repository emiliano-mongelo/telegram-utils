import { chatIds } from "../constants";
import { translate } from "../services/translator";

const handleMrTraderMsg = async (airgram: any, message: any) => {
  const { content } = message;

  console.log("[handleMrTraderMsg]", { content });

  await airgram.api.getChat({ chatId: chatIds.translator });
  const originalText =
    content._ === "messagePhoto" ? content.caption.text : content.text.text;

  const translatedTextEn = await translate({ text: originalText, from: 'tr', to: 'en' });
  const translatedTextEs = await translate({ text: originalText, from: 'tr', to: 'es' });

  const messagePayload = {
    chatId: chatIds.alertsGroup,
    inputMessageContent: {
      _: "inputMessageText",
      text: {
        _: "formattedText",
        text: `MrTrader: \n[EN]:${translatedTextEn}\n[ES]:${translatedTextEs}`,
      },
    },
  };

  // @ts-ignore
  const sendMessageResponse = await airgram.api.sendMessage(messagePayload);

  // @ts-ignore
  if (sendMessageResponse.response.code === 5) {
    await airgram.api.createPrivateChat({ userId: chatIds.translator });
    // @ts-ignore
    const sendMessage = await airgram.api.sendMessage(messagePayload);
    console.log("[private]", sendMessage);
  }
};

export default handleMrTraderMsg;
