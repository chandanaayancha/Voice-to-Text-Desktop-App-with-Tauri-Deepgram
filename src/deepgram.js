// Deepgram API Configuration
const DEEPGRAM_API_KEY = "YOUR_API_KEY_HERE"; // Replace with your Deepgram API key
const DEEPGRAM_URL = "https://api.deepgram.com/v1/listen";

/**
 * Transcribes audio using Deepgram API
 * @param {Blob} audioBlob - Audio blob to transcribe
 * @param {string} language - Language code (e.g., 'en-US')
 * @returns {Promise<string>} - Transcribed text
 */
export async function transcribeAudio(audioBlob, language = "en-US") {
  try {
    // Validate API key
    if (!DEEPGRAM_API_KEY || DEEPGRAM_API_KEY === "YOUR_API_KEY_HERE") {
      throw new Error("Please add your Deepgram API key in src/deepgram.js");
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("audio", audioBlob);

    // Build URL with parameters
    const params = new URLSearchParams({
      model: "nova-2", // Use Nova-2 model for better accuracy
      language: language,
      punctuate: "true",
      paragraphs: "true",
      diarize: "false",
      numerals: "true",
      profanity_filter: "false",
      redact: "false",
      smart_format: "true",
    });

    const url = `${DEEPGRAM_URL}?${params.toString()}`;

    // Make API request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Token ${DEEPGRAM_API_KEY}`,
      },
      body: audioBlob,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Deepgram API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Extract transcript from response
    if (data.results?.channels?.[0]?.alternatives?.[0]?.transcript) {
      return data.results.channels[0].alternatives[0].transcript;
    } else {
      throw new Error("No transcript found in response");
    }
    
  } catch (error) {
    console.error("Deepgram transcription error:", error);
    
    // Fallback to mock response for testing (remove in production)
    if (process.env.NODE_ENV === "development") {
      console.warn("Using mock response for development");
      return mockTranscription();
    }
    
    throw error;
  }
}

/**
 * Mock transcription for testing (remove in production)
 */
function mockTranscription() {
  const mockResponses = [
    "Hello! This is a demonstration of the speech-to-text functionality. The system is working perfectly.",
    "Welcome to Wespr Flow. This application converts your speech into text in real-time with high accuracy.",
    "The weather today is beautiful with clear skies and a gentle breeze. Perfect for outdoor activities.",
    "Artificial intelligence is transforming how we interact with technology through natural language processing.",
    "Please speak clearly into the microphone for best transcription results. Background noise may affect accuracy."
  ];
  
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}

/**
 * Get available languages from Deepgram
 * @returns {Promise<Array<{code: string, name: string}>>}
 */
export async function getAvailableLanguages() {
  return [
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "hi-IN", name: "Hindi" },
    { code: "ja-JP", name: "Japanese" },
    { code: "ko-KR", name: "Korean" },
    { code: "pt-BR", name: "Portuguese" },
    { code: "ru-RU", name: "Russian" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "zh-TW", name: "Chinese (Traditional)" },
    { code: "nl-NL", name: "Dutch" },
    { code: "it-IT", name: "Italian" },
    { code: "tr-TR", name: "Turkish" },
  ];
}
