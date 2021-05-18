import { Auth, prompt } from "airgram";

const authMiddleWare = () => {
  console.log('[authMiddleWare] Check authentication')
  new Auth({
    code: () => prompt(`Please enter the secret code:\n`),
    phoneNumber: () => prompt(`Please enter your phone number:\n`),
  });
};

export default authMiddleWare;
