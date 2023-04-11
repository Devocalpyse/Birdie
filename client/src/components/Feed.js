import { useContext, useEffect } from 'react';
import { Section, Box, Media, Title, Button } from 'reactbulma';
import { MessageContext } from '../contexts/MessageProvider';
import { UserContext } from '../contexts/UserProvider';
import { Link, useParams } from 'react-router-dom';

export default function Feed() {
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  let { messages } = useContext(MessageContext);

  const userFilter = messages.filter((message) => {
    console.log(userId)
    return message.User.userId == userId;
  });

  function checkParams() {
    if (!userId) {
      return messages;
    } else {
      return userFilter;
    }
  }

  function checkUser(messageUserId) {
    if (messageUserId !== user.userId) return;
    return (
      <Media.Right>
        <Button warning>Edit</Button> <Button danger>Delete</Button>
      </Media.Right>
    );
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
              </Media.Content>
              {checkUser(message.User.userId)}
            </Media>
          </Box>
        );
      })}
    </Section>
  );
}
