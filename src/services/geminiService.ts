import { GoogleGenAI, Modality } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export async function speakText(text: string) {
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say cheerfully: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // 'Kore' is a good voice
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioBlob = base64ToBlob(base64Audio, "audio/pcm");
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      // Since it's PCM 24000Hz, we might need a better way to play it if standard Audio doesn't work.
      // But the guidelines say "decode and play audio with sample rate 24000".
      // Actually, for PCM, we usually need Web Audio API.
      
      await playPcmAudio(base64Audio);
    }
  } catch (error) {
    console.error("Error generating speech:", error);
  }
}

function base64ToBlob(base64: string, mimeType: string) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

async function playPcmAudio(base64Data: string) {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // PCM 16-bit is 2 bytes per sample
  const float32Data = new Float32Array(len / 2);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < float32Data.length; i++) {
    // Read as Int16 and convert to Float32 (-1.0 to 1.0)
    float32Data[i] = view.getInt16(i * 2, true) / 32768;
  }

  const buffer = audioContext.createBuffer(1, float32Data.length, 24000);
  buffer.getChannelData(0).set(float32Data);

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
}
