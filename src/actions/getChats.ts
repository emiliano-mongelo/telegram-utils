import { toObject } from "airgram";

const getChats = async (airgram) => {
  const { response } = await airgram.api.getChats({
    limit: 50,
    offsetChatId: 0,
    offsetOrder: "9223372036854775807",
  });

  for (const chatId of response.chatIds) {
    const chat = toObject(await airgram.api.getChat({ chatId }));
    // @ts-ignore
    console.log({ title: chat.title, id: chat.id });
  }
};

export default getChats;
