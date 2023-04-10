import axios from 'axios';
import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState({
    userId: '',
    username: '',
    firstName: '',
    lastName: '',
    favoriteColor: '',
  });

  // Defining base url for users
  const baseUrl = process.env.BASE_URL_USERS;

  // Function to create a new user
  async function createUser(username, password, firstName, lastName, favoriteColor) {
    let user = { username, password, firstName, lastName, favoriteColor };

    let res = await axios.post(baseUrl, user);
    return new Promise((resolve) => resolve(res));
  }

  // Function to login a user
  async function loginUser(username, password) {
    let user = { username, password };

    let res = await axios.post(`${baseUrl}/login`, user);
    localStorage.setItem('token', res.data.token);

    let state = getUser(res.data.userId);
    setUser(state);
  }

  // Function to get a user's details by id
  async function getUser(userId) {
    const token = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    let res = await axios.get(`${baseUrl}/${userId}`, { headers: token });
    return new Promise((resolve) => resolve(res));
  }

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        loginUser,
        getUser,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}
