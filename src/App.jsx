import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return (
    <div className="container">
      <h1 className="title">🎤 Wispr Flow</h1>
      <p className="subtitle">Click start and speak clearly</p>

      <div className="buttons">
        <button className="btn start" onClick={startListening}>
          Start Listening
        </button>
        <button className="btn stop" onClick={stopListening}>
          Stop
        </button>
      </div>

      <p className="output">{text}</p>
    </div>
  );
}

export default App;



