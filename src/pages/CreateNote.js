import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import VirtualKeyboard from '../components/VirtualKeyboard';
import { encryptMessage, generateEncryptionKey, generateNoteId, createShareableLink } from '../utils/encryption';
import { typeWriterEffect } from '../utils/security';

const CreateNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
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
  width: 100%;

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

const NoteArea = styled.div`
  width: 100%;
  background-color: var(--terminal-dark);
  border: 1px solid var(--neon-green);
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  min-height: 150px;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  overflow-y: auto;
  white-space: pre-wrap;
`;

const NoteContent = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  color: var(--neon-green);
  min-height: 100px;
  
  &::after {
    content: '|';
    animation: blink 1s step-end infinite;
  }
  
  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const ControlsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
`;

const TimerSelector = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  
  label {
    margin-bottom: 10px;
    font-size: 1.1rem;
  }
  
  select {
    background-color: var(--terminal-dark);
    border: 1px solid var(--neon-green);
    color: var(--neon-green);
    padding: 10px;
    font-size: 1rem;
    outline: none;
    
    &:focus {
      box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
    }
    
    option {
      background-color: var(--terminal-black);
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  
  button {
    flex: 1;
    padding: 12px;
    font-size: 1.1rem;
    
    @media (max-width: 480px) {
      padding: 8px;
      font-size: 0.9rem;
    }
  }
`;

const ShareableLinkContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: rgba(0, 255, 65, 0.1);
  border: 1px solid var(--neon-green);
  border-radius: 5px;
  
  h3 {
    margin-bottom: 10px;
    font-size: 1.1rem;
  }
  
  p {
    margin-bottom: 10px;
    text-align: center;
    font-size: 0.9rem;
    line-height: 1.2;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: var(--terminal-dark);
    border: 1px dashed var(--neon-green);
    color: var(--neon-green);
    font-size: 0.9rem;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  button {
    width: 100%;
  }
`;

const TerminalMessage = styled.div`
  font-family: 'Courier New', monospace;
  color: var(--neon-green);
  margin: 10px 0;
`;

const CreateNote = () => {
  const [noteText, setNoteText] = useState('');
  const [expiryTime, setExpiryTime] = useState('10');
  const [shareableLink, setShareableLink] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [decryptedNote, setDecryptedNote] = useState('');
  const [displayedNote, setDisplayedNote] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(100);
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const noteContentRef = useRef(null);
  const shareLinkInputRef = useRef(null);
  const timerRef = useRef(null);
  const typingTimerRef = useRef(null);


  const handleKeyboardInput = (input) => {

    const formatted = formatWithLineBreaks(input);
    setNoteText(formatted);
  };


  const formatWithLineBreaks = (text, maxCharsPerLine = 35) => {
    if (!text) return '';
    
    let result = '';
    for (let i = 0; i < text.length; i++) {

      result += text[i];
      

      if ((i + 1) % maxCharsPerLine === 0 && i !== text.length - 1 && text[i] !== '\n') {
        result += '\n';
      }
    }
    
    return result;
  };


  useEffect(() => {
    if (showNote && decryptedNote) {

      setTypingIndex(0);
      setDisplayedNote('');
      

      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
      

      const totalExpiryMs = parseInt(expiryTime, 10) * 1000;
      const typingDurationMs = Math.max(Math.min(totalExpiryMs / 3, 10000), 3000);
      

      const typingInterval = typingDurationMs / decryptedNote.length;
      

      typingTimerRef.current = setInterval(() => {
        setTypingIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex <= decryptedNote.length) {

            const formattedText = formatWithLineBreaks(decryptedNote.substring(0, nextIndex));
            setDisplayedNote(formattedText);
            return nextIndex;
          } else {
            clearInterval(typingTimerRef.current);
            return prevIndex;
          }
        });
      }, typingInterval); // Dynamic speed based on note length and expiry time
    }
    
    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, [showNote, decryptedNote]);
  
  // Create encrypted note
  const createEncryptedNote = async () => {
    if (!noteText.trim()) {
      setStatusMessage('Error: Note cannot be empty.');
      return;
    }

    try {
      setIsEncrypting(true);
      setStatusMessage('> Generating encryption key...');

      // Simulate processing delay for effect
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setStatusMessage('> Encrypting note with AES-256...');
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Set the decrypted note content
      setDecryptedNote(noteText);
      setDisplayedNote(''); // Reset displayed note for typing effect
      setTimeLeft(parseInt(expiryTime, 10));
      
      setStatusMessage('> Preparing secure note...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Switch to note view mode
      setShowNote(true);
      
      // Start countdown timer
      startCountdown(parseInt(expiryTime, 10));
      
      setStatusMessage('> Note ready. Self-destruction countdown started!');
      setIsEncrypting(false);
    } catch (error) {
      console.error('Error creating note:', error);
      setStatusMessage(`> Error: ${error.message}`);
      setIsEncrypting(false);
    }
  };
  
  // Start countdown timer
  const startCountdown = (duration) => {
    let timeRemaining = duration;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      timeRemaining -= 1;
      setTimeLeft(timeRemaining);
      
      // Calculate progress percentage
      const progressPercentage = (timeRemaining / duration) * 100;
      setProgress(progressPercentage);
      
      if (timeRemaining <= 0) {
        clearInterval(timerRef.current);
        destroyNote();
      }
    }, 1000);
  };
  
  // Destroy the note with animation
  const destroyNote = () => {
    const messageContainer = document.querySelector('.message-container');
    if (messageContainer) {
      messageContainer.classList.add('disintegrate');
    }
    
    // Show destroyed message after animation
    setTimeout(() => {
      setIsDestroyed(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        resetForm();
      }, 3000);
    }, 2000);
  };
  
  // Format time display
  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds} saniye`;
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} dakika ${remainingSeconds} saniye`;
  };
  
  // Reset form after note is destroyed
  const resetForm = () => {
    setNoteText('');
    setShareableLink('');
    setStatusMessage('');
    setShowNote(false);
    setDecryptedNote('');
    setIsDestroyed(false);
    setProgress(100);
  };

  // Clear form
  const handleClear = () => {
    setNoteText('');
    setShareableLink('');
    setStatusMessage('');
  };

  // Copy link to clipboard (when allowed by user)
  const copyLinkToClipboard = async () => {
    if (shareableLink) {
      try {
        // Use the modern Clipboard API
        await navigator.clipboard.writeText(shareableLink);
        setStatusMessage('> Link copied to clipboard!');
      } catch (err) {
        // Fallback to the older method if Clipboard API is not available
        try {
          if (shareLinkInputRef.current) {
            shareLinkInputRef.current.select();
            document.execCommand('copy');
            setStatusMessage('> Link copied to clipboard!');
          }
        } catch (fallbackErr) {
          setStatusMessage('> Please manually copy the link (Ctrl+C)');
        }
      }
    }
  };

  // Apply typewriter effect on mount
  useEffect(() => {
    const header = document.querySelector('h1');
    if (header) {
      typeWriterEffect(header, 'ANONOTE', 100);
    }
  }, []);

  // Add new styled components for note view mode
  const MessageContainer = styled.div`
    width: 100%;
    background: none;
    padding: 20px;
    margin-bottom: 20px;
    min-height: 200px;
    position: relative;
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
    font-size: 1.2rem;
    color: var(--neon-green);
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.8;
    text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
    
    .cursor {
      animation: blink-cursor 0.8s step-end infinite;
      font-weight: bold;
    }
    
    @keyframes blink-cursor {
      from, to { opacity: 1; }
      50% { opacity: 0; }
    }
    
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

  if (isDestroyed) {
    return (
      <CreateNoteContainer>
        <Header>
          <h1></h1>
          <p className="typing-effect">Type. Share. Disappear.</p>
        </Header>
        
        <DestructedMessage>
          <h2>NOTE DESTROYED</h2>
          <p>{">"}  Message permanently deleted.</p>
          <p>{">"}  No trace found.</p>
          <p>{">"}  Connection terminated.</p>
          <p>{">"}  Preparing for new note creation...</p>
        </DestructedMessage>
      </CreateNoteContainer>
    );
  }

  if (showNote) {
    return (
      <CreateNoteContainer>
        <Header>
          <h1></h1>
          <p className="typing-effect">Self-Destructing Message</p>
        </Header>
        
        <MessageContainer className="message-container">
          <MessageContent>{displayedNote}<span className="cursor">|</span></MessageContent>
        </MessageContainer>
        
        <TimerContainer>
          <p>Message will self-destruct in: {timeLeft} seconds</p>
          <ProgressBar progress={progress}>
            <div className="fill"></div>
          </ProgressBar>
        </TimerContainer>
        
        {statusMessage && <TerminalMessage>{statusMessage}</TerminalMessage>}
      </CreateNoteContainer>
    );
  }

  return (
    <CreateNoteContainer>
      <Header>
        <h1></h1>
        <p className="typing-effect">Type. Share. Disappear.</p>
      </Header>
      
      <NoteArea>
        <NoteContent ref={noteContentRef}>{noteText}</NoteContent>
      </NoteArea>
      
      <VirtualKeyboard onChange={handleKeyboardInput} />
      
      <ControlsContainer>
        <TimerSelector>
          <label htmlFor="expiryTime">Message Visibility Duration (seconds)</label>
          <select 
            id="expiryTime" 
            value={expiryTime} 
            onChange={(e) => setExpiryTime(e.target.value)}
            disabled={isEncrypting}
          >
            <option value="10">10 seconds</option>
            <option value="20">20 seconds</option>
            <option value="30">30 seconds</option>
            <option value="60">60 seconds</option>
            <option value="120">120 seconds</option>
          </select>
        </TimerSelector>
        
        {statusMessage && <TerminalMessage>{statusMessage}</TerminalMessage>}
        
        <ButtonContainer>
          <button onClick={handleClear} disabled={isEncrypting}>
            Clear
          </button>
          <button onClick={createEncryptedNote} disabled={!noteText || isEncrypting}>
            {isEncrypting ? 'Encrypting...' : 'Create Secure Note'}
          </button>
        </ButtonContainer>
      </ControlsContainer>
    </CreateNoteContainer>
  );
};

export default CreateNote;
