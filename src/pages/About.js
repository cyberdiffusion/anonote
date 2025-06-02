import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { typeWriterEffect } from '../utils/security';

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const AboutContent = styled.div`
  width: 100%;
  background-color: rgba(0, 255, 65, 0.05);
  border: 1px solid var(--neon-green);
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
  }
  
  h2 {
    margin-bottom: 15px;
    font-size: 1.5rem;
    border-bottom: 1px solid var(--neon-green);
    padding-bottom: 10px;
    
    @media (max-width: 480px) {
      font-size: 1.3rem;
      margin-bottom: 10px;
    }
  }
  
  p {
    margin-bottom: 15px;
    line-height: 1.6;
    
    @media (max-width: 480px) {
      font-size: 0.95rem;
      line-height: 1.4;
      margin-bottom: 10px;
    }
  }
  
  ul {
    margin-bottom: 20px;
    padding-left: 20px;
    
    @media (max-width: 480px) {
      padding-left: 15px;
      margin-bottom: 15px;
    }
    
    li {
      margin-bottom: 8px;
      list-style-type: '> ';
      
      @media (max-width: 480px) {
        font-size: 0.95rem;
        margin-bottom: 6px;
      }
    }
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  background-color: rgba(0, 255, 65, 0.03);
  border: 1px solid var(--neon-green);
  border-radius: 5px;
  padding: 15px;
  
  @media (max-width: 480px) {
    padding: 10px;
  }
  
  h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
      margin-bottom: 8px;
    }
  }
  
  p {
    font-size: 0.9rem;
    opacity: 0.9;
    
    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  
  @media (max-width: 480px) {
    margin-top: 20px;
  }
  
  a {
    display: inline-block;
    padding: 12px 25px;
    background-color: var(--terminal-black);
    border: 1px solid var(--neon-green);
    color: var(--neon-green);
    text-decoration: none;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    
    @media (max-width: 480px) {
      padding: 10px 20px;
      font-size: 1rem;
    }
    
    &:hover {
      background-color: var(--neon-green);
      color: var(--terminal-black);
      box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
    }
  }
`;

const About = () => {
  useEffect(() => {
    // Apply typewriter effect on header
    const header = document.querySelector('h1');
    if (header) {
      typeWriterEffect(header, 'ABOUT ANONOTE', 100);
    }
  }, []);

  return (
    <AboutContainer>
      <Header>
        <h1></h1>
        <p className="typing-effect">Type. Share. Disappear.</p>
      </Header>
      
      <AboutContent>
        <h2>What Is Anonote?</h2>
        <p>
          Anonote is a privacy-first platform that allows users to create encrypted, self-destructing notes 
          without leaving any trace — and without using a physical keyboard. The goal is simple: the message is visible 
          only once, for a limited time, and then permanently deleted.
        </p>
        
        <h2>How Does It Work?</h2>
        <ul>
          <li>
            Users type their message using a virtual keyboard only (on-screen keys).
            This eliminates the risk of keyloggers or physical traceability.
          </li>
          <li>
            Once typed, the message is encrypted directly in the browser and a shareable link is generated.
          </li>
          <li>
            The recipient can view the message for a fixed duration (e.g., 30 seconds).
          </li>
          <li>
            Once the time runs out, the message is automatically destroyed.
          </li>
          <li>
            The system ensures that a message is viewable only once — it cannot be accessed again after being opened.
          </li>
        </ul>
        
        <h2>Security Features</h2>
        <FeatureGrid>
          <FeatureItem>
            <h3>Virtual Keyboard Only</h3>
            <p>Users can only type using the on-screen keyboard, eliminating the risk of hardware keyloggers.</p>
          </FeatureItem>
          
          <FeatureItem>
            <h3>Client-side Encryption</h3>
            <p>AES-256 encryption done entirely in the browser. The server cannot decrypt your messages.</p>
          </FeatureItem>
          
          <FeatureItem>
            <h3>Self-destructing Notes</h3>
            <p>Notes are deleted after they are read or when the timer expires, leaving no trace behind.</p>
          </FeatureItem>
          
          <FeatureItem>
            <h3>No Copy / Screenshot</h3>
            <p>Right-click, Ctrl+C, and screenshot attempts are blocked or discouraged for maximum security.</p>
          </FeatureItem>
          
          <FeatureItem>
            <h3>No Tracking</h3>
            <p>No IP logging, cookies, or fingerprinting. True anonymity guaranteed for peace of mind.</p>
          </FeatureItem>
          
          <FeatureItem>
            <h3>One-time Viewing</h3>
            <p>Messages can only be viewed once, after which they are permanently destroyed.</p>
          </FeatureItem>
        </FeatureGrid>
        
        <h2>Target Use Cases</h2>
        <ul>
          <li>Sharing highly confidential information once-only with a friend.</li>
          <li>Situations where a keylogger might be present on the device.</li>
          <li>Environments where spoken communication may be unsafe or monitored.</li>
          <li>Users who want to avoid permanent records in apps like WhatsApp, Telegram, etc.</li>
        </ul>
        
        <h2>Open Source</h2>
        <p>
          Anonote is an open source project originally created in 2017 by <a href="https://github.com/cyberdiffusion" target="_blank" rel="noopener noreferrer">CyberDiffusion</a>. 
          The project is available under the MIT License, which means you are free to use, modify, and distribute the code.
        </p>
        <p>
          Visit our <a href="https://github.com/cyberdiffusion/anonote" target="_blank" rel="noopener noreferrer">GitHub repository</a> to contribute or report issues.
        </p>
      </AboutContent>
      
      <ButtonContainer>
        <Link to="/">Create Secure Note</Link>
      </ButtonContainer>
    </AboutContainer>
  );
};

export default About;
