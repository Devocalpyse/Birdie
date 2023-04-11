import { useState } from 'react';
import { Textarea, Title, Section, Box, Level, Field, Control, Button } from 'reactbulma';

export default function TextBox() {
  const [message, setMessage] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    alert(message);
  }

  return (
    <Section>
      <Title className='is-3'>Make a new post</Title>
      <Box>
        <form onSubmit={handleSubmit}>
          <Field>
            <Control>
              <Textarea
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
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
