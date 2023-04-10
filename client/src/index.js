import React from 'react';
import ReactDOM from 'react-dom';
import UserProvider from './contexts/UserProvider'; 
import App from './App';
import 'bulmaswatch/lumen/bulmaswatch.scss';
import 'dotenv/config';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
