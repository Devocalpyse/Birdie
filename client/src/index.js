import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './contexts/UserProvider'; 
import App from './App';
import 'bulmaswatch/superhero/bulmaswatch.scss';
import { MessageProvider } from './contexts/MessageProvider';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
