import React, { useState } from 'react';
import './Popup.css'; // Import your custom CSS

const VoiceCloningModal = () => {
  const [recordingTime, setRecordingTime] = useState('0:00');

  const handleRecordingStart = () => {
    // Implement logic to start recording and update recordingTime state
  };

  const handleRecordingStop = () => {
    // Implement logic to stop recording
  };

  const handleRestart = () => {
    // Implement logic to restart recording
  };

  const handleClose = () => {
    // Implement logic to close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
        <h2 className="modal-title">CLONING YOUR VOICE</h2>
        <p className="modal-description">Talk about your favorite city.</p>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${recordingTime}%` }}
            ></div>
          </div>
        </div>
        <div className="button-container">
          <button
            onClick={handleRecordingStart}
            className="start-button"
          >
            Start Recording
          </button>
          <button
            onClick={handleRecordingStop}
            className="stop-button"
          >
            Stop Recording
          </button>
        </div>
        <div className="restart-container">
          <button
            onClick={handleRestart}
            className="restart-button"
          >
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
            Restart
          </button>
        </div>
        <p className="modal-text">
          Or read along: There's something about traveling that opens your eyes
          to the beauty of the world. Take my trip to the Amazon Rainforest, for
          example. Being there, amidst such vibrant nature, it's an
          indescribable feeling. It makes you wonder-how much of the world do
          we take for granted? Every trip, every new landscape, changes you a
          little, doesn't it? It makes you
        </p>
      </div>
    </div>
  );
};

export default VoiceCloningModal;
