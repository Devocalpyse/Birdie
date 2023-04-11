import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const MessageContext = createContext();

export function MessageProvider(props) {
  // Starting definitions
  const baseUrl = 'http://localhost:3000/api/messages';
  const [messages, setMessages] = useState([]);

  // Using useEffect to set the messages state
  useEffect(() => {
    async function fetch() {
      await getAllMessages();
    }
    fetch();
  }, []);

  // GET all messages
  function getAllMessages() {
    return axios.get(baseUrl).then((res) => {
      setMessages(res.data);
    });
  }

  // GET a single message
  async function getMessageById(messageId) {
    const token = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    let res = await axios.get(`${baseUrl}/${messageId}`, { headers: token });
    return new Promise((resolve) => resolve(res.data));
  }

  // POST a new message
  async function createMessage(message) {
    const token = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    let res = await axios.post(baseUrl, message, { headers: token });
    return new Promise((resolve) => resolve(res.data));
  }

  // PUT a message
  async function updateMessage(message) {
    const token = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    let res = await axios.put(`${baseUrl}/${message.id}`, message, { headers: token });
    return new Promise((resolve) => resolve(res.data));
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