import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navi from './components/Navi';
import Home from './components/Home';
import Feed from './components/Feed';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import TextBox from './components/TextBox';
import EditMessage from './components/EditMessage';

function App() {
  return (
    <BrowserRouter>
      <Navi />
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Feed />} />
        </Route>
        <Route path='signIn' element={<SignIn />} />
        <Route path='signUp' element={<SignUp />} />
        <Route path='profile' element={<Profile />}>
          <Route path=':userId' element={<Feed />} />
          <Route path='*' element={<p>User not found.</p>} />
        </Route>
        <Route path='message' element={<EditMessage />}>
          <Route path=':messageId' element={<TextBox />} />
          <Route path='*' element={<p>No message found. Wrong id?</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
