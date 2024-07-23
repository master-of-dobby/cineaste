// SpeechRecognitionComponent.js
import React, { useState } from 'react';

// Web Speech API for speech recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const SpeechRecognitionComponent = () => {
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState('');

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(`Transcript: ${transcript}`);
    setListening(false);

    // Send transcript to backend for processing
    const res = await fetch('http://localhost:8080/api/book-ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: transcript }),
    });

    const data = await res.json();
    setResponse(data.message);
    console.log(data.message);
  };

  recognition.onspeechend = () => {
    recognition.stop();
    setListening(false);
  };

  recognition.onerror = (event) => {
    console.error(event.error);
    setListening(false);
  };

  return (
    <div>
      <h1>AI Ticket Booking</h1>
      <button onClick={startListening} disabled={listening}>
        {listening ? 'Listening...' : 'Start Voice Input'}
      </button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default SpeechRecognitionComponent;
