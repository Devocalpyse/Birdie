import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserProvider';
import { MessageContext } from '../contexts/MessageProvider';

export default function Feed() {
  let { getUser } = useContext(UserContext);
  let { messages } = useContext(MessageContext);
  console.log('Our messages:', messages)

  return (
    <div className='box'>
      {messages.map(async (message) => {
        console.log('Right before map function:', typeof messages);
        // const { username } = await getUser(message.userId);
        // console.log('Username = ', username);

        // return (
        //   <div className='box' key={message.messageId}>
        //     <h1 className='title'>{message.message}</h1>
        //     <p className='subtitle'>{username}</p>
        //   </div>
        // );
      })}
    </div>
  );
}
