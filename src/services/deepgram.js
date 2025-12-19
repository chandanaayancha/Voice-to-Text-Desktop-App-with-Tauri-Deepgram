const DEEPGRAM_API_KEY = "d7b7961f641fbeddd4a57d48b6bd97bd92a34a4f";

export async function transcribeAudio(audioBlob) {
  const response = await fetch(
    "https://api.deepgram.com/v1/listen?punctuate=true",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${DEEPGRAM_API_KEY}`,
      },
      body: audioBlob,
    }
  );

  const data = await response.json();

  return (
    data?.results?.channels[0]?.alternatives[0]?.transcript || ""
  );
}
