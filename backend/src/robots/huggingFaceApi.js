require("dotenv").config();

const HF_API_TOKEN = process.env.HF_TOKEN;
const HF_MODEL_URL =
  "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct";

//!NOTE: HAVING WEIRD BEHAVIOR MAY EXCEED THE LIMIT OF WORD CHARACTERS CAN HAVE
async function callHuggingFaceAPI(calendarData) {
  if (!HF_API_TOKEN) {
    console.error("HF_API_TOKEN is not defined in the .env file");
    return null;
  }

  const prompt = `
You are an AI assistant tasked with creating an exercise schedule. 

STRICT INSTRUCTIONS:
1. ONLY return a valid JSON array of exercise schedules
2. Each exercise schedule must be an object with:
   - date (YYYY-MM-DD format)
   - time_start (HH:MM format)
   - time_end (HH:MM format)
   - exercise (from: badminton, basketball, climbing, dancing, jumprope, running, soccer, swimming, yoga)

CALENDAR INPUT:
${JSON.stringify(calendarData)}

CONSTRAINTS:
- Identify free time slots in the calendar
- Create at least 3 exercise sessions per week
- Match exercise duration to available free time (5-90 minutes)
- Avoid scheduling over existing commitments
- Avoid midnight exercise sessions
- Avoid scheduling exercise sessions on the same day

EXAMPLE OUTPUT FORMAT:
[
  {
    "date": "2024-12-16",
    "time_start": "20:00",
    "time_end": "20:45",
    "exercise": "running"
  }
]

YOUR RESPONSE MUST BE ONLY A VALID JSON ARRAY. 

PLEASE NO EXPLANATIONS OR TEXT JUST JSON VALUE.

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
    // console.log("====================================");
    // console.log(data);
    // console.log("====================================");
    const generatedText = data[0]?.generated_text;

    try {
      const data_return = JSON.parse(generatedText);
      // console.log("====================================");
      // console.log(data_return);
      // console.log("====================================");
      return data_return;
    } catch (parseError) {
      console.error("Failed to parse JSON:", generatedText);
      return null;
    }
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    return null;
  }
}

module.exports = callHuggingFaceAPI;
