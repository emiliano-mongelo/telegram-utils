require("dotenv").config();

const config = {
  airgram: {
    // @ts-ignore
    apiId: parseInt(process.env.AIRGRAM_API_ID),
    apiHash: process.env.AIRGRAM_HASH,
    command: process.env.TDLIB_COMMAND,
    logVerbosityLevel: 2,
  },
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
  },
};

export default config;
