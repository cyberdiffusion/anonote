import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import CreateNote from './pages/CreateNote';
import ViewNote from './pages/ViewNote';
import About from './pages/About';
import GlobalStyles from './styles/GlobalStyles';
import { initializeSecurity } from './utils/security';

const AppContainer = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  margin: 0 auto;
`;

function App() {
  useEffect(() => {
    // Initialize security measures when app loads
    initializeSecurity();
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        <Navigation />
        <Routes>
          <Route path="/" element={<CreateNote />} />
          <Route path="/view/:noteId" element={<ViewNote />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
