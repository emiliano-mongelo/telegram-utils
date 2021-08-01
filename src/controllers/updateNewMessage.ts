import { chatIds } from "../constants";
import handleMrTraderChatGroupMsg from "../actions/handleMrTraderChatGroupMsg";
import handleMrTraderMsg from "../actions/handleMrTraderMsg";

const updateNewMessage = (airgram) => async ({ update }) => {
  const { message } = update;

  if (message.chatId === chatIds.mrTrader) {
    console.log("Message received from MrTrader", { message });
    await handleMrTraderMsg(airgram, message);
  }

  if (message.chatId === chatIds.mrTraderChatGroup || message.chatId === chatIds.mistNftGroup) {
    console.log("Message received from mrTraderChatGroup", { message });
    await handleMrTraderChatGroupMsg(airgram, message);
  }
};

export default updateNewMessage;
