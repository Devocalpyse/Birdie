import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import { Box, Button, Field, Section } from 'reactbulma';

export default function UserForm() {
  const navigate = useNavigate();
  const { createUser, updateUser } = useContext(UserContext);
  const { userId } = useParams();
  const [user, setUser] = useState({
    userId: userId,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    favoriteColor: undefined,
  });

  let { username, password, firstName, lastName, favoriteColor } = user;

  useEffect(() => {
    if (!user.userId) return null;
    async function fetch() {
      let res = await fetch(`/api/users/${user.userId}`);
      let data = await res.json();
      setUser(data);
    }
    fetch();
  });

  function optionSelect() {
    if (user.userId === undefined) {
      return createUser(user)
        .then(navigate('/signIn'))
        .catch((error) => {
          console.log(error);
          window.alert('Failed registration: error creating user');
        });
    } else {
      return updateUser(user)
        .then(navigate('/signIn'))
        .catch((error) => {
          console.log(error);
          window.alert('Failed registration: error updating user');
        });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    optionSelect();
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
          {user.userId === undefined ? (
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
          ) : null}
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
