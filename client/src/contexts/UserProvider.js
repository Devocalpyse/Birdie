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
  async function loginUser(username, password) {
    let user = { username, password };

    let res = await axios.post(`${baseUrl}/login`, user);
    localStorage.setItem('token', res.data.token);

    let state = getUser(res.userId);
    setUser(state);
  }

  // Function to get a user's details by id
  function getUser(userId) {
    return axios.get(`${baseUrl}/${userId}`).then((res) => {
      console.log(res.data);
      return new Promise((resolve) => resolve(res.data));
    });
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
