export function useDeepgramStream(onTranscript) {
  let socket;
  let mediaRecorder;

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    socket = new WebSocket(
      "wss://api.deepgram.com/v1/listen?punctuate=true&interim_results=true",
      ["token", "YOUR_DEEPGRAM_API_KEY"]
    );

    socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      const transcript =
        data.channel?.alternatives?.[0]?.transcript;

      if (transcript) onTranscript(transcript);
    };

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (socket.readyState === 1) socket.send(e.data);
    };

    mediaRecorder.start(250); // send audio every 250ms
  }

  function stop() {
    mediaRecorder?.stop();
    socket?.close();
  }

  return { start, stop };
}
