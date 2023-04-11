import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Hero } from 'reactbulma';
import { UserContext } from '../contexts/UserProvider';
import TextBox from './TextBox';

export default function Home() {
  let { user } = useContext(UserContext);

  return (
    <div>
      <Hero primary>
        <Hero.Body>
          <h1 className='title has-text-centered'>Message Board</h1>
          {user.firstName ? (
            <h2 className='subtitle has-text-centered'>Welcome, {user.firstName}!</h2>
          ) : null}
        </Hero.Body>
      </Hero>
      {user.userId ? <TextBox /> : null}
      <Outlet />
    </div>
  );
}
