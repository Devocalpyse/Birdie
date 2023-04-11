import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import { Box, Button, Field, Section } from 'reactbulma';

export default function SignIn() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  let { username, password } = user;

  function handleSubmit(event) {
    event.preventDefault();
    console.log(user);
    loginUser(user)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        window.alert('Failed login: error logging in');
      });
  }

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  return (
    <Section>
      <Box>
        <form onSubmit={handleSubmit}>
          <Field>
            <label className='label is-size-4'>Username</label>
            <div className='control'>
              <input
                className='input is-rounded'
                type='text'
                name='username'
                placeholder='Username'
                value={username}
                onChange={handleChange}
              />
            </div>
          </Field>
          <Field>
            <label className='label is-size-4'>Password</label>
            <div className='control'>
              <input
                className='input is-rounded'
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={handleChange}
              />
            </div>
          </Field>
          <br />
          <Button
            primary
            className='is-medium is-rounded is-fullwidth'
            type='submit'>
            Sign In
          </Button>
        </form>
      </Box>
    </Section>
  );
}
