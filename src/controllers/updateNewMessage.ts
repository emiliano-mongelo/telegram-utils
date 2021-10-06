import { chatIds } from "../constants";
import handleMrTraderMsg from "../actions/handleMrTraderMsg";
import handleMsg from "../actions/handleMsg";

const updateNewMessage = (airgram) => async ({ update }) => {
  const { message } = update;

  if (message.chatId === chatIds.tradingLatino) {
    console.log("Message received from TradingLatino", { message });
    await handleMsg(airgram, message);
  }

  if (message.chatId === chatIds.mrTrader) {
    console.log("Message received from MrTrader", { message });
    await handleMrTraderMsg(airgram, message);
  }
};

export default updateNewMessage;
