import { Link } from 'react-router-dom';
import { Button } from 'reactbulma';

export default function Navi() {
  return (
    <nav className='navbar is-info'>
      <div className='navbar-brand'>
        <Link to='/' className='navbar-item'>
          <img src='https://bulma.io/images/bulma-logo.png' width='112' height='28' alt='Bulma' />
        </Link>
      </div>
      <div className='navbar-end'>
        <Link to='/' className='navbar-item'>
          Feed
        </Link>
        <div className='navbar-item'>
          <div className='buttons'>
            <Link to='/signIn' className='button is-dark'>
              Sign In
            </Link>
            <Link to='/signUp' className='button'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
