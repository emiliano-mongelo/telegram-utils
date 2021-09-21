import { chatIds } from "../constants";

const handleMsg = async (airgram: any, message: any) => {
  const { content } = message;
  await airgram.api.getChat({ chatId: chatIds.alertsGroup });

  console.log("[handleMsg]", { content });

  const messagePayload = {
    chatId: chatIds.alertsGroup,
    inputMessageContent: {
      _: "inputMessageText",
      text: {
        _: "formattedText",
        // @ts-ignore
        text: content.text.text,
      },
    },
  };

  // @ts-ignore
  const sendMessageResponse = await airgram.api.sendMessage(messagePayload);

  // @ts-ignore
  if (sendMessageResponse.response.code === 5) {
    await airgram.api.createPrivateChat({ userId: chatIds.alertsGroup });
    // @ts-ignore
    const sendMessage = await airgram.api.sendMessage(messagePayload);
    console.log("[private]", sendMessage);
  }
};

export default handleMsg;
