import { Outlet } from 'react-router-dom';
import { Hero } from 'reactbulma';

export default function Home() {
  return (
    <div>
      <Hero success>
        <Hero.Body>
          <h1 className='title has-text-centered'>Message Feed</h1>
        </Hero.Body>
      </Hero>
      <Outlet />
    </div>
  );
}
