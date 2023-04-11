import { useContext } from 'react';
import { Section, Box, Media, Title } from 'reactbulma';
import { MessageContext } from '../contexts/MessageProvider';

export default function Feed() {
  let { messages } = useContext(MessageContext);

  return (
    <Section>
      <Title className='is-3'>Messages</Title>
      {messages.map((message) => {
        return (
          <Box key={message.messageId}>
            <Media>
              <Media.Content>
                <b className='is-size-5'>
                  {message.User.firstName} {message.User.lastName}
                </b>{' '}
                <small className='is-size-5 has-text-link'>@{message.User.username}</small>
                <p className='is-size-4'>{message.message}</p>
              </Media.Content>
            </Media>
          </Box>
        );
      })}
    </Section>
  );
}
