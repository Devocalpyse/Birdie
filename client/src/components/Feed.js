import { useContext } from 'react';
import { Section, Box, Media, Title, Button } from 'reactbulma';
import { MessageContext } from '../contexts/MessageProvider';
import { UserContext } from '../contexts/UserProvider';
import { Link, useParams } from 'react-router-dom';

export default function Feed() {
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  let { messages, deleteMessage } = useContext(MessageContext);

  const userFilter = messages.filter((message) => {
    return message.User.userId == userId;
  });

  function checkParams() {
    if (!userId) {
      return messages;
    } else {
      return userFilter;
    }
  }

  function checkUser(message) {
    if (message.User.userId !== user.userId) return;
    return (
      <Media.Right>
        <Link to={`/message/${message.messageId}`} className='button is-warning'>
          Edit
        </Link>{' '}
        <Button danger onClick={() => deleteMessage(message.messageId)}>Delete</Button>
      </Media.Right>
    );
  }

  function localTime(time) {
    let date = new Date(time);
    return date.toLocaleString();
  }

  return (
    <Section>
      <Title className='is-3'>Messages</Title>
      {checkParams().map((message) => {
        return (
          <Box key={message.messageId}>
            <Media>
              <Media.Content>
                <b className='is-size-5'>
                  {message.User.firstName} {message.User.lastName}
                </b>{' '}
                <Link to={`/profile/${message.User.userId}`}>
                  <small className='is-size-5 has-text-primary'>@{message.User.username}</small>
                </Link>
                <p className='is-size-4'>{message.message}</p>
                <br />
                <small>{localTime(message.updatedAt)}</small>
              </Media.Content>
              {checkUser(message)}
            </Media>
          </Box>
        );
      })}
    </Section>
  );
}
