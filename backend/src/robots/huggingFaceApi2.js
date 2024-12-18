require("dotenv").config();

const HF_API_TOKEN = process.env.HF_TOKEN;
const HF_MODEL_URL =
  "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct";

async function callHuggingFaceAPI2(language = "en") {
  if (!HF_API_TOKEN) {
    console.error("HF_API_TOKEN is not defined in the .env file");
    return null;
  }

  const languageInstructions = {
    vi: "VIETNAMESE",
    ja: "JAPANESE",
    en: "ENGLISH",
  };

  const prompt = `
You are an AI fitness coach.

TASKS:
Provide recommendations for exercise improvement in ${languageInstructions[language]}

JUST ONE PARAGRAPH ABOUT 4-5 SENTENCES NOT OTHER VALID DATA
NO NEW LINE IN PARAGRAPH 
JUST RECOMMENDATION NO ASKING

CRITICAL INSTRUCTIONS:
1. NO NEWLINE CHARACTERS IN OUTPUT 
2. Keep response compact and continuous
3. Write a single, unbroken paragraph

`;

  const headers = {
    Authorization: `Bearer ${HF_API_TOKEN}`,
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    inputs: prompt,
    parameters: {
      max_new_tokens: 1000,
      return_full_text: false,
    },
  });

  try {
    const response = await fetch(HF_MODEL_URL, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    const generatedText = data[0]?.generated_text;

    return generatedText;
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    return null;
  }
}

module.exports = callHuggingFaceAPI2;
