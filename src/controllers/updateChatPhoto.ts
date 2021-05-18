import { chatIds } from "../constants";
import { InputMessageTextInput } from "airgram";

const updateChatPhoto = (airgram) => async ({ update }) => {
  const { chatId } = update;
  console.log(
    "[updateChatPhoto] Imagen has changed",
    JSON.stringify(update, null, 2)
  );

  if (chatId === chatIds.alertsChannel) {
    await airgram.api.getChats({
      limit: 50,
      offsetChatId: 0,
      offsetOrder: "9223372036854775807",
    });

    const inputMessageContent: InputMessageTextInput = {
      _: "inputMessageText",
      text: {
        _: "formattedText",
        text: "Nuevo mensaje de Trading Latino",
      },
    };

    await airgram.api.sendMessage({
      chatId: chatIds.alertsGroup,
      inputMessageContent,
    });

    const response = await airgram.api.sendMessage({
      chatId: chatIds.alertsGroup,
      inputMessageContent,
    });

    console.log("[updateChatPhoto] Message sent...", { response });
  }
};

export default updateChatPhoto;
