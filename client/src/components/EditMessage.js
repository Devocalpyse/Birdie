import { Title, Section } from 'reactbulma';
import { Outlet } from 'react-router-dom';

export default function EditMessage() {
  return (
    <Section>
      <Title className='is-3'>Edit your message...</Title>
      <Outlet />
    </Section>
  );
}
