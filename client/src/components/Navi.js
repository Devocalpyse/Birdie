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
          <div>
            <p className='has-text-grey'>Signed in as:</p>{' '}
            <button className='button is-dark'>{user.username}</button>
          </div>
          <button className='button is-danger'>Log Out</button>
        </div>
      );
    }
  }

  return (
    <nav className='navbar is-info'>
      <div className='navbar-brand'>
        <Link to='/' className='navbar-item'>
          <img src='https://bulma.io/images/bulma-logo.png' width='112' height='28' alt='Bulma' />
        </Link>
      </div>
      <div className='navbar-start'>
        <div className='navbar-item'>
          <Link to='/messages' className='button is-success'>
            Message Feed
          </Link>
        </div>
      </div>
      <div className='navbar-end'>
        <div className='navbar-item'>{userCheck()}</div>
      </div>
    </nav>
  );
}
