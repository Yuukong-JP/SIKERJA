import { GoogleGenAI } from "@google/genai";

// FIX: Aligned with Gemini API guidelines to directly initialize the client assuming `process.env.API_KEY` is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const model = 'gemini-2.5-flash';

export const getGeminiChatStream = async (history: { role: string; parts: { text: string }[] }[], newMessage: string) => {
  const systemInstruction = "Anda adalah asisten virtual dari Dinas Ketenagakerjaan. Jawab pertanyaan pengguna terkait ketenagakerjaan seperti cara mendaftar kerja, informasi BPJS, dan lowongan pekerjaan. Berikan jawaban yang singkat, ramah, dan informatif dalam Bahasa Indonesia. Jangan berikan informasi di luar topik ketenagakerjaan.";

  try {
    const chat = ai.chats.create({
      model: model,
      history: history,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const result = await chat.sendMessageStream({ message: newMessage });
    return result;
  } catch (error) {
    console.error("Error getting chat stream from Gemini:", error);
    throw new Error("Failed to get response from Gemini.");
  }
};
