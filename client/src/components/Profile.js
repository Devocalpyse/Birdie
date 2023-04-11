import { useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider'
import { Section, Title } from 'reactbulma';

export default function Profile() {
  const { user } = useContext(UserContext);
  const { userId } = useParams();

  return (
    <>
      <Section>
        <Title>Starting title</Title>
      </Section>
      <Outlet />
    </>
  );
}
