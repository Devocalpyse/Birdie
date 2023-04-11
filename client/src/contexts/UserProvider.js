import axios from 'axios';
import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState({
    userId: '',
    username: '',
    firstName: '',
    lastName: '',
    favoriteColor: ''
  });

  // Defining base url for users
  const baseUrl = 'http://localhost:3000/api/users';

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
    let path = `${baseUrl}/${userId}`;
    return await axios
      .get(path)
      .then((res) => {
        console.log(res.data)
        setUser(res.data)
      })
      .catch((err) => {
        console.log(err);
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
