


export const preventRightClick = () => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
};


export const preventKeyboardShortcuts = () => {
  document.addEventListener('keydown', (e) => {

    if (
      (e.ctrlKey && (e.key === 'c' || e.key === 's' || e.key === 'p')) ||
      (e.ctrlKey && e.shiftKey && e.key === 'i') ||
      e.key === 'F12' ||
      e.key === 'PrintScreen'
    ) {
      e.preventDefault();
      return false;
    }
  });
};


export const preventCopySelection = () => {
  document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
  });
  
  document.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
  });
};


export const preventPageLeave = () => {
  window.addEventListener('beforeunload', (e) => {

    const message = 'Leaving this page will destroy the note permanently. Are you sure?';
    e.returnValue = message;
    return message;
  });
};


export const blurOnTabChange = () => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {

      document.body.classList.add('blurred');
    } else {
      document.body.classList.remove('blurred');
    }
  });
};


export const detectScreenshots = () => {

  document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
      alert('Screenshots are not allowed for security reasons.');
    }
  });
};


export const initializeSecurity = () => {
  preventRightClick();
  preventKeyboardShortcuts();
  preventCopySelection();
  blurOnTabChange();
  detectScreenshots();
};


export const addTerminalBeepSound = () => {
  const beepSound = new Audio('/beep.mp3'); 
  document.addEventListener('click', () => {
    beepSound.play().catch(e => {});
  });
};


export const typeWriterEffect = (element, text, speed = 50) => {
  let i = 0;
  element.innerHTML = '';
  
  const typing = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, speed);
};
