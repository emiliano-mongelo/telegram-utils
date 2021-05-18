import { chatIds } from "../constants";
import handleTranslatorMsg from "../actions/handleTranslatorMsg";
import handleMrTraderMsg from "../actions/handleMrTraderMsg";

const updateNewMessage = (airgram) => async ({ update }) => {
  const { message } = update;

  if (message.chatId === chatIds.translator) {
    console.log("Message received from translator", { message });
    await handleTranslatorMsg(airgram, message);
  }
  if (message.chatId === chatIds.mrTrader) {
    console.log("Message received from MrTrader", { message });
    await handleMrTraderMsg(airgram, message);
  }
};

export default updateNewMessage;
