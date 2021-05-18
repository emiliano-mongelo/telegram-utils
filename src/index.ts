import { Airgram, Auth, prompt } from "airgram";
import config from "../config";
import updateChatPhoto from "./controllers/updateChatPhoto";
import updateNewMessage from "./controllers/updateNewMessage";
import getChats from './actions/getChats'

// @ts-ignore
const airgram = new Airgram(config.airgram);
const updateChatPhotoController = updateChatPhoto(airgram);
const updateNewMessageController = updateNewMessage(airgram);

// Auth middleware
airgram.use(
  new Auth({
    code: () => prompt(`Please enter the secret code:\n`),
    phoneNumber: () => prompt(`Please enter your phone number:\n`),
  })
);

void (getChats(airgram))

// Trading latino notifications
airgram.on("updateChatPhoto", updateChatPhotoController);

// Getting new messages
airgram.on("updateNewMessage", updateNewMessageController);
