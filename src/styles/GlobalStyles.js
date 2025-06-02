import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --neon-green: #00FF41;
    --terminal-black: #000000;
    --terminal-dark: #0D0208;
    --terminal-grey: #2E2E2E;
    --danger-red: #FF0000;
    --glow-effect: 0 0 10px var(--neon-green), 0 0 20px var(--neon-green);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Courier New', monospace;
    color: var(--neon-green);
    -webkit-font-smoothing: none;
    max-width: 100%;
  }
  
  /* Keyboard specific overrides */
  .simple-keyboard .hg-button:hover,
  .simple-keyboard .hg-button:hover span,
  .simple-keyboard .hg-activeButton,
  .simple-keyboard .hg-activeButton span {
    color: var(--terminal-black) !important;
  }

  body, html {
    background-color: var(--terminal-black);
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    user-select: none;
    position: relative;
    max-width: 100vw;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    text-shadow: var(--glow-effect);
    letter-spacing: 1px;
  }

  button {
    background-color: var(--terminal-black);
    border: 1px solid var(--neon-green);
    color: var(--neon-green);
    padding: 10px 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-shadow: 0 0 5px var(--neon-green);
    letter-spacing: 1px;
    
    &:hover {
      background-color: var(--neon-green);
      color: var(--terminal-black);
      box-shadow: var(--glow-effect);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  input, textarea {
    background-color: var(--terminal-dark);
    border: 1px solid var(--neon-green);
    color: var(--neon-green);
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
    caret-color: var(--neon-green);
    
    &:focus {
      outline: none;
      box-shadow: var(--glow-effect);
    }
  }

  a {
    color: var(--neon-green);
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      text-shadow: var(--glow-effect);
    }
  }

  .container {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    
    @media (max-width: 768px) {
      padding: 15px 10px;
    }
    
    @media (max-width: 480px) {
      padding: 10px 5px;
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: var(--terminal-black);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--neon-green);
    border-radius: 2px;
  }

  /* Blinking cursor effect */
  .blink {
    animation: blink-animation 1s steps(2, start) infinite;
  }

  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }

  /* Typing effect */
  .typing-effect {
    overflow: hidden;
    border-right: 2px solid var(--neon-green);
    white-space: nowrap;
    margin: 0 auto;
    animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
  }

  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
  
  /* Mobile specific adjustments */
  @media (max-width: 480px) {
    button {
      padding: 8px 12px;
    }
    
    input, textarea {
      padding: 8px;
      margin-bottom: 8px;
    }
  }

  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: var(--neon-green) }
  }
`;

export default GlobalStyles;
