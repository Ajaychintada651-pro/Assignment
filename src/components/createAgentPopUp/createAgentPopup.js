import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../PopUp/Popup.css"; // Import your custom CSS
import axios from "axios";

// Check if the browser supports Speech Recognition
const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceCloningModal = ({
  isModalOpen,
  closeModal,
  title = "Cloning Your Voice",
  content = "Talk about your favorite city.",
  handleDataFromChild,
}) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [voiceName, setVoiceName] = useState("");


  useEffect(() => {
    if (SpeechRecognition) {
      const newRecognition = new SpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.interimResults = true;

      newRecognition.onstart = () => {
        setIsListening(true);
        console.log("Voice recognition started");
      };

      newRecognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setTranscript(currentTranscript);
      };

      newRecognition.onend = () => {
        if (isListening) {
          newRecognition.start(); // Restart recognition if still listening
        }
      };

      newRecognition.onerror = (event) => {
        console.error("Speech recognition error detected: ", event.error);
      };

      setRecognition(newRecognition);
    }
  }, []);

  const handleRecordingStart = () => {
    if (recognition) {
      recognition.start(); // Start recognition here

    }
  };

  const handleRecordingStop = () => {
    if (recognition) {
      recognition.stop(); // Stop recognition
    }
    setIsListening(false);
    setIsNameModalOpen(true);
    closeModal();
  };

  const handleSaveVoiceName = () => {
    console.log("Voice name saved:", voiceName);

    const postData = {
      voice: transcript,
      displayName: voiceName,
      description: "You are an agent for a company that sells widgets. A customer calls in and asks about the different types of widgets you sell. You should respond by telling the customer about the different types of widgets you sell and how they differ from each other.\n",
      criticalKnowledge: "We have been in business for 20 years and have sold over 1 million widgets. Currently, we have 3 types of widgets: the standard widget, the deluxe widget, and the super widget. The standard widget is our most popular widget and is the most affordable. The deluxe widget is our",
    };

    axios
      .post("http://localhost:3020/api/agent", postData, {
        headers: {
          AUTHORIZATION: "ak-4a954a1e5ced4bffb469d82ea4ce609b",
          "X-USER-ID": "QtLpEGe55fOLspv0wJAwytlgy8I2",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        handleDataFromChild(response.data.id);
      })
      .catch((err) => {
        console.error(err);
      });

    setIsNameModalOpen(false);
    handleClose();
  };

  const handleNameChange = (e) => {
    setVoiceName(e.target.value);
  };

  const handleSkip = () => {
    console.log("Voice name skipped.");
    setIsNameModalOpen(false);
    handleClose();
  };

  const handleRestart = () => {
    setTranscript("");
    if (recognition) {
        recognition.stop(); // Stop recognition on restart
      }
  };

  const handleClose = () => {
    closeModal();
    handleRestart();
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      width: '500px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };

  const inputStyles = {
    width: "100%",
    padding: "12px 20px",
    margin: "10px 0",
    boxSizing: "border-box",
    border: "2px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    fontSize: "16px",
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    transition: "all 0.3s ease",
  };

  const buttonStyles = {
    padding: "12px 24px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "transparent", // Transparent background
    border: "1px solid gray",
    color:"#000",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    marginRight:"20px",
    marginTop:"10px"
  };

  return (
    <div >
      <Modal isOpen={isModalOpen} onRequestClose={handleClose} style={customStyles} >
        <div className="modal-header">
          <button onClick={handleClose} className="close-button">
            <svg
              className="close-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-description">{content}</p>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${transcript.length > 0 ? (transcript.length / 200) * 100 : 0}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="button-container">
          <button onClick={handleRecordingStart} className="start-button">
            Start Recording
          </button>
          <button onClick={handleRecordingStop} className="stop-button">
            Stop Recording
          </button>
        </div>
        <div className="restart-container">
          <button onClick={handleRestart} className="restart-button">
            <svg
              className="restart-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            U Restart
          </button>
        </div>
        <p className="transcript-text">Transcript: {transcript}</p>
        <p className="modal-text">
          <strong>Or read along:</strong> There's something about traveling that opens your eyes to the beauty of the world. Take my trip to the Amazon Rainforest, for example. Being there, amidst such vibrant nature, it's an indescribable feeling. It makes you wonder how much of the world do we take for granted? Every trip, every new landscape, changes you a little, doesn't it? It makes you...
        </p>
      </Modal>

      {/* Name your voice modal */}
      <Modal isOpen={isNameModalOpen} onRequestClose={handleSkip} style={customStyles}>
        <h2>Name Your Voice</h2>
        <input
          type="text"
          value={voiceName}
          onChange={handleNameChange}
          placeholder="Enter voice name"
          className="voice-name-input"
          style={inputStyles}
        />
        <div className="name-modal-button-container">
          <button onClick={handleSkip} style={buttonStyles}>Skip</button>
          <button onClick={handleSaveVoiceName} style={buttonStyles}>Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default VoiceCloningModal;
