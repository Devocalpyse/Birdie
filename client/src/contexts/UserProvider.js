import axios from 'axios';
import { createContext } from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
  // Defining base url for users
  const baseUrl = process.env.BASE_URL_USERS;

  //   Function to create a new user
  async function createUser(username, password, firstName, lastName, favoriteColor) {
    let user = { username, password, firstName, lastName, favoriteColor };

    try {
      let res = await axios.post(baseUrl, user);
      return new Promise((resolve) => resolve(res));
    } catch (err) {
      console.error(err);
    }
  }

  // Function to login a user
  async function loginUser(username, password) {
    let user = { username, password };

    try {
      let res = await axios.post(`${baseUrl}/login`, user);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err);
    }
  }

  //   Function to get a user's details by id
  async function getUser(userId) {
    try {
      let res = await axios.get(`${baseUrl}/${userId}`);
      return new Promise((resolve) => resolve(res));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <UserContext.Provider
      value={{
        createUser,
        loginUser,
        getUser,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}
