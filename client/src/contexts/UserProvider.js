import axios from 'axios';
import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState({
    userId: '',
    username: '',
    firstName: '',
    lastName: '',
    favoriteColor: null,
  });

  // Defining base url for users
  const baseUrl = 'http://localhost:3000/api/users';

  // Function to create a new user
  async function createUser(user) {
    let res = await axios.post(baseUrl, user);
    return new Promise((resolve) => resolve(res.data));
  }

  // Function to login a user
  async function loginUser(login) {
    let res = await axios.post(`${baseUrl}/login`, login);
    localStorage.setItem('token', res.data.token);

    console.log(res.data.userId);
    let state = await getUser(res.data.userId);
    setUser(state);
  }

  // Function to get a user's details by id
  function getUser(userId) {
    return axios.get(`${baseUrl}/${userId}`).then((res) => {
      console.log(res.data);
      return new Promise((resolve) => resolve(res.data));
    });
  }

  function logOut() {
    localStorage.removeItem('token');
    setUser({
      userId: '',
      username: '',
      firstName: '',
      lastName: '',
      favoriteColor: null,
    })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        loginUser,
        getUser,
        logOut,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}
