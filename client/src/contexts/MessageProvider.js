import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const MessageContext = createContext();

export function MessageProvider(props) {
  // Starting definitions
  const [messages, setMessages] = useState([]);
  const baseUrl = process.env.BASE_URL_MESSAGES;

  // Using useEffect to set the messages state
  useEffect(() => {
    getAllMessages();
  }, []);

  // GET all messages
  async function getAllMessages() {
    let res = await axios.get(baseUrl);
    setMessages(res.data);
  }

  // GET a single message
  async function getMessageById(messageId) {
    const token = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    let res = await axios.get(`${baseUrl}/${messageId}`, { headers: token });
    return new Promise((resolve) => resolve(res));
  }

  // POST a new message
  async function createMessage(message) {
    const token = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    let res = await axios.post(baseUrl, message, { headers: token });
    return new Promise((resolve) => resolve(res));
  }

  // PUT a message
  async function updateMessage(message) {
    const token = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    let res = await axios.put(`${baseUrl}/${message.id}`, message, { headers: token });
    return new Promise((resolve) => resolve(res));
  }

  return (
    <MessageContext.Provider
      value={{
        messages,
        getAllMessages,
        getMessageById,
        createMessage,
        updateMessage,
      }}>
      {props.children}
    </MessageContext.Provider>
  );
}
