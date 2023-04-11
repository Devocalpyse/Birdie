import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import { Box, Button, Field, Section } from 'reactbulma';

export default function SignUp() {
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    favoriteColor: undefined,
  });

  const navigate = useNavigate();
  const { createUser } = useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(user);
    createUser(user)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        window.alert('Failed registration: error creating user');
      });
  }

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  let { username, password, firstName, lastName, favoriteColor } = user;

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
          <Field>
            <label className='label is-size-4'>First Name</label>
            <div className='control'>
              <input
                className='input is-rounded'
                type='text'
                name='firstName'
                placeholder='First Name'
                value={firstName}
                onChange={handleChange}
              />
            </div>
          </Field>
          <Field>
            <label className='label is-size-4'>Last Name</label>
            <div className='control'>
              <input
                className='input is-rounded'
                type='text'
                name='lastName'
                placeholder='Last Name'
                value={lastName}
                onChange={handleChange}
              />
            </div>
          </Field>
          <Field>
            <label className='label is-size-4'>Favorite Color</label>
            <div className='control'>
              <input
                className='input is-rounded'
                type='text'
                name='favoriteColor'
                placeholder='Favorite Color'
                value={favoriteColor}
                onChange={handleChange}
              />
            </div>
          </Field>
          <br />
          <Button primary className='is-medium is-rounded is-fullwidth' type='submit'>
            Sign Up
          </Button>
        </form>
      </Box>
    </Section>
  );
}
