import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import CreateAgentPopup from '../createAgentPopUp/createAgentPopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const words = ['for LLMS', 'for Agents', 'for Copilots', 'for Assistants', 'for Characters', 'Of AI.'];
  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(200);
  const [isComplete, setIsComplete] = useState(false);
  const [agentId, setAgentId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechSynthesisUtterance, setSpeechSynthesisUtterance] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0); // Timer state
  const [isWaveVisible, setIsWaveVisible] = useState(false);


  

  useEffect(() => {
    if (isComplete) return;

    const type = () => {
      const word = words[wordIndex];
      const updatedWord = isDeleting
        ? word.substring(0, charIndex - 1)
        : word.substring(0, charIndex + 1);

      setCurrentWord(updatedWord);

      if (!isDeleting && updatedWord === word) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedWord === '') {
        setIsDeleting(false);
        setWordIndex((prevIndex) => {
          if (prevIndex + 1 === words.length) {
            setIsComplete(true);
            return prevIndex;
          } else {
            return prevIndex + 1;
          }
        });
        setCharIndex(0);
      } else {
        setCharIndex(isDeleting ? charIndex - 1 : charIndex + 1);
      }
    };

    const timer = setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, typingSpeed, wordIndex, words, isComplete]);

  const displayWord = isComplete ? words[words.length - 1] : currentWord;

  // Fetching agent data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          headers: {
            AUTHORIZATION: 'ak-4a954a1e5ced4bffb469d82ea4ce609b',
            'X-USER-ID': 'QtLpEGe55fOLspv0wJAwytlgy8I2'
          }
        };

        const response = await axios.get(`http://localhost:3020/api/agent/${agentId}`, options);
        console.log(response.data);
        setTranscript(response.data.transcript); // Assuming 'transcript' is the key in the response
        startSpeaking(response.data.voice);
      } catch (error) {
        console.error(error);
      }
    };

    if (agentId !== '' && agentId !== null) {
      fetchData();
    }
  }, [agentId]);

  // Timer logic
  useEffect(() => {
    let timerInterval;
    if (isSpeaking) {
      timerInterval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval); // Cleanup interval on unmount
  }, [isSpeaking]);

  // Function to start speaking the transcript
  const startSpeaking = (text) => {
    if (!window.speechSynthesis || !text) return;
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsWaveVisible(true); // Show wave when speaking starts
      console.log('Speaking started...');
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsWaveVisible(false); // Hide wave when speaking ends
      console.log('Speaking ended...');
    };
  
    speechSynthesis.speak(utterance);
    setSpeechSynthesisUtterance(utterance);
  };

  // Function to stop speaking
  const stopSpeaking = () => {
    if (speechSynthesisUtterance) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setAgentId('');
    }
  };

  const handleDataFromChild = (data) => {
    console.log('Data from child:', data);
    setAgentId(data);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createAgent = () => {};

  const shareUrl = async () => {
    const urlToShare = window.location.href;
    try {
      await navigator.clipboard.writeText(urlToShare + agentId);
      toast.success('URL copied to clipboard!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Format the timer in minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const style = {
    width: '100px', // Adjust width as necessary
    height: '100px', // Adjust height as necessary
    animation: 'pulse 1.5s infinite', // Apply the pulse animation
  };

  const overlayStyle = {
    position: 'absolute',
    width: '120px',
    height: '120px',
    backgroundColor: 'rgba(0, 255, 0, 0.5)', // Semi-transparent green
    animation: 'pulse 1.5s infinite', // Apply the pulse animation
    borderRadius: '50%', // Optional: Makes the overlay circular
    transform: 'translate(-50%, -50%)', // Center the overlay
    zIndex: 0,
  };


  return (
    <div className='home-pg-bg-cont'>

<style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>

      <h1 className='home-pg-heading'>
        The Voice Interface <br />
        <span className='typewriter'>
          {displayWord}
          <span className="cursor">|</span>
        </span>
      </h1>

      {agentId === null || agentId === '' ? (
        <>
          <div className='ai-cont'>
            <h4>CLICK TO TALK TO</h4>
            <div className='image-cont'>
              <img src="/img/logo2.svg" alt="logo2" className='logo-image' />
            </div>
            <h4>PLAY AI</h4>
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <div className='shuffle-btn'>
              <img src="/img/IconShuffle.svg" alt="shuffle" className='shuffle-icon' />
              <p className='suffle-text'>Shuffle</p>
            </div>
            <div className='shuffle-btn' onClick={shareUrl}>
              <img src="/img/IconShare.svg" alt="share" className='shuffle-icon' />
              <p className='suffle-text'>Share</p>
            </div>
          </div>

          {/* Clone Your Voice button */}
          <div className='cloning-btn' onClick={openModal}>
            <img src="/img/soundwave.svg" alt="soundwave" className='soundwave-icon' />
            <p>Clone Your Voice</p>
            <img src="/img/rightArrow.svg" alt="right arrow" className='right-arrow' />
          </div>

          <CreateAgentPopup
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            handleDataFromChild={handleDataFromChild}
          />

          <div className='cloning-btn2' onClick={createAgent}>
            <img src="/img/logo.svg" alt="logo" className='soundwave-icon' />
            <p>Create an Agent</p>
            <img src="/img/rightArrow.svg" alt="right arrow" className='right-arrow' />
          </div>
        </>
      ) : (
        <>
          <div className='ai-cont'>
            <h4>IN CONVERSATION WITH</h4>
            <div className='image-cont'>
              <img src="/img/emptyRing.svg" alt="logo2" className='logo-image' style={style}/>
            </div>
            <div style={overlayStyle}></div> {/* Green overlay */}
            <h4>YOUR VOICE</h4>
          </div>

          {/* Timer display */}
          <p>Timer: {formatTime(timeElapsed)}</p>

          {/* End Conversation button */}
          <div
            className='cloning-btn'
            style={{ backgroundColor: 'red', color: '#ffffff', marginTop: '5px' }}
            onClick={stopSpeaking}
          >
            <p>End Your Conversation</p>
          </div>

          <CreateAgentPopup
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            handleDataFromChild={handleDataFromChild}
          />

          <div className='cloning-btn' style={{ backgroundColor: 'transparent', paddingLeft: '55px', paddingRight: '55px' }} onClick={shareUrl}>
            <p>Share Agent</p>
            <img src="/img/rightArrow.svg" alt="right arrow" className='right-arrow' />
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default HomePage;
