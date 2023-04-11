import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navi from './components/Navi';
import Home from './components/Home';
import Feed from './components/Feed';

function App() {
  return (
    <BrowserRouter>
      <Navi />
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Feed />} />
        </Route>
        {/* <Route path='signIn' element={<SigIn />} />
        <Route path='signUp' element={<SignUp />} /> */}
        {/* <Route path='profile' element={<Profile />}>
          <Route path=':userId' element={<Profile />}>
            <Route index element={<Feed />} />
          </Route>
          <Route path='*' element={<p>User not found.</p>} />
        </Route> */}
        {/* <Route path='message' element={<Message />}>
          <Route path=':messageId' element={<Message />} />
          <Route path='*' element={<NotFound err="Message not found." />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
