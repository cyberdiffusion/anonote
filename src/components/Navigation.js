import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid var(--neon-green);
  box-shadow: 0 1px 10px rgba(0, 255, 65, 0.2);
  position: relative;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 600px) {
    padding: 10px 8px;
  }
  
  @media (max-width: 360px) {
    padding: 8px 5px;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--neon-green);
  text-decoration: none;
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
  letter-spacing: 2px;
  
  &:hover {
    text-shadow: 0 0 15px var(--neon-green), 0 0 25px var(--neon-green);
  }
  
  @media (max-width: 600px) {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
  
  @media (max-width: 360px) {
    font-size: 1rem;
    letter-spacing: 0.5px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 600px) {
    gap: 10px;
  }
  
  @media (max-width: 360px) {
    gap: 8px;
  }
`;

const NavLink = styled(Link)`
  color: var(--neon-green);
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  padding: 5px 0;
  white-space: nowrap;
  
  &:after {
    content: '';
    position: absolute;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--neon-green);
    transition: width 0.3s ease;
    box-shadow: 0 0 8px var(--neon-green);
  }
  
  &:hover:after {
    width: 100%;
  }
  
  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 3px 0;
  }
  
  @media (max-width: 360px) {
    font-size: 0.8rem;
    padding: 2px 0;
  }
`;

const Navigation = () => {
  const location = useLocation();
  
  return (
    <NavContainer>
      <Logo to="/">ANONOTE</Logo>
      <NavLinks>
        <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
          Create Note
        </NavLink>
        <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0}>
          About
        </NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navigation;
