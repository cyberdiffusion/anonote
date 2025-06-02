import React, { useState, useEffect, useCallback } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import styled from 'styled-components';

const KeyboardWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  box-sizing: border-box;
  
  .simple-keyboard {
    background-color: var(--terminal-dark);
    border: 1px solid var(--neon-green);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  }
  
  .simple-keyboard .hg-button {
    background-color: var(--terminal-black);
    border: 1px solid var(--neon-green);
    color: var(--neon-green);
    box-shadow: 0 0 5px rgba(0, 255, 65, 0.2);
    height: 40px;
    font-size: 14px;
  }
  
  .simple-keyboard .hg-button:hover {
    background-color: var(--neon-green);
    color: var(--terminal-black) !important;
  }
  
  .simple-keyboard .hg-button:hover * {
    color: var(--terminal-black) !important;
  }
  
  .simple-keyboard .hg-activeButton {
    background-color: var(--neon-green);
    color: var(--terminal-black) !important;
  }
  
  .simple-keyboard .hg-activeButton * {
    color: var(--terminal-black) !important;
  }
  
  @media (max-width: 768px) {
    margin-top: 15px;
    
    .simple-keyboard {
      padding: 4px;
    }
    
    .simple-keyboard .hg-button {
      height: 36px;
      font-size: 12px;
      margin: 1px;
    }
  }
  
  @media (max-width: 480px) {
    margin-top: 10px;
    
    .simple-keyboard {
      padding: 2px;
    }
    
    .simple-keyboard .hg-button {
      height: 28px;
      font-size: 9px;
      padding: 1px;
      margin: 1px;
    }
    
    .simple-keyboard .hg-row {
      margin-bottom: 2px;
    }
  }
  
  @media (max-width: 360px) {
    .simple-keyboard .hg-button {
      height: 24px;
      font-size: 8px;
      padding: 0px;
      margin: 0.5px;
    }
  }

`;

const VirtualKeyboard = ({ onChange, onEnter }) => {
  const [layoutName, setLayoutName] = useState('default');
  const [capsLock, setCapsLock] = useState(false);
  
  // Keyboard layouts
  const keyboardLayouts = {
    default: [
      '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
      '{tab} q w e r t y u i o p [ ] \\',
      '{lock} a s d f g h j k l ; \' {enter}',
      '{shift} z x c v b n m , . / {shift}',
      '{space} {alt} {ctrl}'
    ],
    shift: [
      '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
      '{tab} Q W E R T Y U I O P { } |',
      '{lock} A S D F G H J K L : " {enter}',
      '{shift} Z X C V B N M < > ? {shift}',
      '{space} {alt} {ctrl}'
    ]
  };

  // Handle keyboard input
  const handleKeyboardInput = useCallback((input) => {
    if (onChange) {
      onChange(input);
    }
  }, [onChange]);

  // Handle keyboard button press
  const handleKeyPress = (button) => {
    if (button === '{shift}' || button === '{lock}') {
      setLayoutName(layoutName === 'default' ? 'shift' : 'default');
      setCapsLock(button === '{lock}' ? !capsLock : capsLock);
    } else if (button === '{enter}' && onEnter) {
      onEnter();
    }
  };

  // Prevent physical keyboard use
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only allow keyboard shortcuts (e.g., for debugging or development)
      if (!(e.ctrlKey || e.metaKey)) {
        e.preventDefault();
      }
    };

    // Add event listener to input fields to prevent physical keyboard
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('keydown', handleKeyDown);
    });

    // Cleanup event listeners
    return () => {
      inputs.forEach(input => {
        input.removeEventListener('keydown', handleKeyDown);
      });
    };
  }, []);

  // Play terminal beep sound on key press
  const playBeepSound = () => {
    // You can implement the beep sound here
    // For now, we'll just leave this empty or as a placeholder
  };

  return (
    <KeyboardWrapper onClick={playBeepSound}>
      <Keyboard
        layoutName={layoutName}
        layout={keyboardLayouts}
        onChange={handleKeyboardInput}
        onKeyPress={handleKeyPress}
        physicalKeyboardHighlight={false}
        preventMouseDownDefault={true}
        disableButtonHold={true}
        theme="hg-theme-default hg-layout-default terminal-keyboard"
        buttonTheme={[
          {
            class: "terminal-key",
            buttons: "a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9 ! @ # $ % ^ & * ( ) _ + { } | : \" ; ' < > , . ? / ~ ` - = \\ [ ] {space} {shift} {bksp} {lock} {tab} {enter} {alt} {ctrl}"
          }
        ]}
      />
    </KeyboardWrapper>
  );
};

export default VirtualKeyboard;
