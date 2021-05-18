import axios from "axios";
import { path } from "ramda";
const googleApiKey = "";
const defaultUrl = "https://translation.googleapis.com/language/translate/v2";

const fetchTranslation = async ({ url = defaultUrl, from, to, text }) => {
  const params = new URLSearchParams();
  params.append("q", text);
  params.append("format", "text");
  params.append("source", from);
  params.append("target", to);
  params.append("key", googleApiKey);

  try {
    const { data } = await axios.post(url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const translatedText = path(["data", "translations", 0, "translatedText"], data);
    console.log("[fetchTranslation] Fetched translation", { translatedText });
    return translatedText;
  } catch (error) {
    console.log("error", { error });
    throw error;
  }
};

export const translate = async ({ text, from = "tr", to = "es" }) => {
  // @ts-ignore
  return await fetchTranslation({ text, from, to });
};

export default translate;
