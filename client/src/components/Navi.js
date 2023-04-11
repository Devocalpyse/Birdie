import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';

export default function Navi() {
  let { user } = useContext(UserContext);

  function userCheck() {
    if (user.userId === '') {
      return (
        <div className='buttons'>
          <Link to='/signIn' className='button is-dark'>
            Sign In
          </Link>
          <Link to='/signUp' className='button'>
            Sign Up
          </Link>
        </div>
      );
    } else {
      return (
        <div className='buttons'>
          <Link to={`/profile/${user.userId}`} className='button is-dark'>
            View Profile
          </Link>
          <button className='button is-danger'>Log Out</button>
        </div>
      );
    }
  }

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <Link to='/' className='navbar-item'>
          <img src='https://bulma.io/images/bulma-logo.png' width='112' height='28' alt='Bulma' />
        </Link>
        <a
          role='button'
          className='navbar-burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarTarget'>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>
      <div id='navbarTarget' className='navbar-menu'>
        <div className='navbar-start'>
          <div className='navbar-item'>
            <Link to='/' className='button is-primary'>
              Message Board
            </Link>
          </div>
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>{userCheck()}</div>
        </div>
      </div>
    </nav>
  );
}
