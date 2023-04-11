import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';
import { MessageContext } from '../contexts/MessageProvider';
import { Media } from 'reactbulma';

export default function Feed() {
  let { messages } = useContext(MessageContext);

  return (
    <div className='section'>
      {messages.map((message) => {
        return (
          <div className='box' key={message.messageId}>
            <Media>
              <Media.Content>
                <b className='is-size-5'>
                  {message.User.firstName} {message.User.lastName}
                </b>{' '}
                <small className='is-size-5 has-text-link'>@{message.User.username}</small>
                <p className='is-size-4'>{message.message}</p>
              </Media.Content>
            </Media>
          </div>
        );
      })}
    </div>
  );
}
