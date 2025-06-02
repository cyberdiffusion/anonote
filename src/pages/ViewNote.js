import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { decryptMessage, extractNoteInfoFromUrl } from '../utils/encryption';
import { initializeSecurity, typeWriterEffect } from '../utils/security';

const ViewNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  min-height: 80vh;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 15px 10px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    padding: 10px 5px;
  }
`;

const Header = styled.div`
  margin-bottom: 30px;
  text-align: center;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.8;
    
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const MessageContainer = styled.div`
  width: 100%;
  background-color: var(--terminal-dark);
  border: 1px solid var(--neon-green);
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  min-height: 200px;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  transition: all 0.5s ease;
  
  &.blur {
    filter: blur(10px);
  }
  
  &.disintegrate {
    animation: disintegrate 2s forwards;
  }
  
  @media (max-width: 768px) {
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    min-height: 150px;
  }
  
  @keyframes disintegrate {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(0.9);
      filter: blur(5px);
    }
    100% {
      opacity: 0;
      transform: scale(0.8);
      filter: blur(20px);
    }
  }
`;

const MessageContent = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  color: var(--neon-green);
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.4;
  }
`;

const TimerContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  p {
    font-size: 1.2rem;
    margin-bottom: 10px;
    text-align: center;
    
    @media (max-width: 480px) {
      font-size: 0.95rem;
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: var(--terminal-dark);
  border: 1px solid var(--neon-green);
  border-radius: 5px;
  overflow: hidden;
  
  .fill {
    height: 100%;
    background-color: var(--neon-green);
    width: ${props => props.progress}%;
    transition: width 1s linear;
    box-shadow: 0 0 10px var(--neon-green);
  }
`;

const StatusMessage = styled.div`
  margin-top: 30px;
  padding: 15px;
  border: 1px dashed var(--neon-green);
  text-align: center;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s ease;
  
  &.error {
    border-color: var(--danger-red);
    color: var(--danger-red);
  }
`;

const DestructedMessage = styled.div`
  margin-top: 40px;
  text-align: center;
  animation: glitch 1s infinite alternate;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 15px;
    
    @media (max-width: 480px) {
      font-size: 1.6rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    
    @media (max-width: 480px) {
      font-size: 0.95rem;
    }
  }
  
  @keyframes glitch {
    0% {
      text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                  -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                  -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    }
    14% {
      text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                  -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                  -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    }
    15% {
      text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                  0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                  -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    49% {
      text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                  0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                  -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    50% {
      text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                  0.05em 0 0 rgba(0, 255, 0, 0.75),
                  0 -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    99% {
      text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                  0.05em 0 0 rgba(0, 255, 0, 0.75),
                  0 -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    100% {
      text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                  -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                  -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  
  .loader {
    font-size: 1.2rem;
    position: relative;
    
    &:after {
      content: '...';
      animation: dots 1.5s steps(5, end) infinite;
    }
  }
  
  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60% { content: '...'; }
    80%, 100% { content: ''; }
  }
`;

const ViewNote = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(100);
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const originalDuration = useRef(0);
  const messageRef = useRef(null);
  
  useEffect(() => {
    // Initialize security measures
    initializeSecurity();
    
    // Apply typewriter effect on header
    const header = document.querySelector('h1');
    if (header) {
      typeWriterEffect(header, 'ANONOTE', 100);
    }
    
    // Extract note ID and encryption key from URL
    const { noteId, encryptionKey } = extractNoteInfoFromUrl();
    
    if (!noteId || !encryptionKey) {
      setIsLoading(false);
      return;
    }
    
    // Simulating network fetch
    const fetchAndDecryptNote = async () => {
      try {
        setStatusMessage('Decrypting note...');
        
        // Get note from localStorage
        const noteData = localStorage.getItem(`note_${noteId}`);
        
        if (!noteData) {
          throw new Error('Note not found or already viewed.');
        }
        
        const parsedNote = JSON.parse(noteData);
        originalDuration.current = parsedNote.expiryTime;
        setTimeLeft(parsedNote.expiryTime);
        
        // Simulate processing time for effect
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Decrypt the message
        const decryptedMessage = decryptMessage(parsedNote.encrypted, encryptionKey);
        
        if (!decryptedMessage) {
          throw new Error('Failed to decrypt message.');
        }
        
        setMessage(decryptedMessage);
        setIsLoading(false);
        
        // Start countdown timer first, delete only after self-destruction
        startCountdown(parsedNote.expiryTime);
      } catch (error) {
        console.error('Error fetching note:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };
    
    fetchAndDecryptNote();
    
    // Cleanup function to ensure note is destroyed when component unmounts
    return () => {
      if (noteId) {
        localStorage.removeItem(`note_${noteId}`);
      }
    };
  }, []);
  
  // Start countdown timer
  const startCountdown = (duration) => {
    let timeRemaining = duration;
    const interval = setInterval(() => {
      timeRemaining -= 1;
      setTimeLeft(timeRemaining);
      

      const progressPercentage = (timeRemaining / duration) * 100;
      setProgress(progressPercentage);
      
      if (timeRemaining <= 0) {
        clearInterval(interval);
        destroyMessage();
      }
    }, 1000);
    
    return () => clearInterval(interval);
  };
  

  const destroyMessage = () => {
    const messageContainer = document.querySelector('.message-container');
    if (messageContainer) {
      messageContainer.classList.add('disintegrate');
    }
    
    // Delete the note from storage when it's destroyed
    const { noteId } = extractNoteInfoFromUrl(window.location.href);
    if (noteId) {
      localStorage.removeItem(`note_${noteId}`);
    }
    
    // Show destroyed message after animation
    setTimeout(() => {
      setIsDestroyed(true);
    }, 2000);
  };
  

  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  };
  
  if (isDestroyed) {
    return (
      <ViewNoteContainer>
        <DestructedMessage>
          <h2>NOTE DESTROYED</h2>
          <p>{">"} Message permanently deleted.</p>
          <p>{">"} No traces found.</p>
          <p>{">"} Connection terminated.</p>
        </DestructedMessage>
      </ViewNoteContainer>
    );
  }
  
  return (
    <ViewNoteContainer>
      <Header>
        <h1></h1>
        <p className="typing-effect">Self-Destructing Message</p>
      </Header>
      
      {isLoading ? (
        <LoadingContainer>
          <div className="loader">Decrypting message</div>
          <StatusMessage visible={!!statusMessage}>{statusMessage}</StatusMessage>
        </LoadingContainer>
      ) : error ? (
        <StatusMessage visible={true} className="error">
          Error: {error}
        </StatusMessage>
      ) : (
        <>
          <MessageContainer className="message-container">
            <MessageContent ref={messageRef}>{message}</MessageContent>
          </MessageContainer>
          
          <TimerContainer>
            <p>Message will self-destruct in {formatTime(timeLeft)}</p>
            <ProgressBar progress={progress}>
              <div className="fill"></div>
            </ProgressBar>
          </TimerContainer>
        </>
      )}
    </ViewNoteContainer>
  );
};

export default ViewNote;
