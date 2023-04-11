import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea, Title, Section, Box, Level, Field, Control, Button } from 'reactbulma';
import { MessageContext } from '../contexts/MessageProvider';

export default function TextBox() {
  const { getMessageById, createMessage, updateMessage } = useContext(MessageContext);
  const { messageId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    messageId: messageId,
    message: '',
  });

  useEffect(() => {
    if (message.messageId === undefined) return;
    async function fetch() {
      await getMessageById(message.messageId).then((message) => setMessage(message));
    }
    fetch();
  }, [message.messageId]);

  function optionSelect() {
    if (message.messageId === undefined) {
      return createMessage(message);
    } else {
      return updateMessage(message).then(navigate('/'));
    }
  }

  function handleChange(event) {
    setMessage((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    optionSelect();
  }

  return (
    <Section>
      <Title className='is-3'>Make a new post</Title>
      <Box>
        <form onSubmit={handleSubmit}>
          <Field>
            <Control>
              <Textarea name="message" value={message.message} onChange={handleChange} />
            </Control>
          </Field>
          <Level>
            <Level.Left>
              <Level.Item>
                <Button info>Submit</Button>
              </Level.Item>
            </Level.Left>
          </Level>
        </form>
      </Box>
    </Section>
  );
}
