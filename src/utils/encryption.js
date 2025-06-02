import CryptoJS from 'crypto-js';

// Generate a random encryption key with specified length
export const generateEncryptionKey = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Encrypt message using AES-256
export const encryptMessage = (message, key) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    return encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt message');
  }
};

// Decrypt message using AES-256
export const decryptMessage = (encryptedMessage, key) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt message');
  }
};

// Generate a unique ID for the note
export const generateNoteId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
};

// Create a shareable link with the note ID and encryption key
export const createShareableLink = (noteId, encryptionKey) => {
  // In a real production app, you'd use your domain name here
  const baseUrl = window.location.origin;
  return `${baseUrl}/view/${noteId}#${encryptionKey}`;
};

// Extract note ID and encryption key from the URL
export const extractNoteInfoFromUrl = () => {
  const pathname = window.location.pathname;
  const noteId = pathname.split('/view/')[1];
  const encryptionKey = window.location.hash.substring(1); // Remove the # symbol
  
  return {
    noteId,
    encryptionKey
  };
};
