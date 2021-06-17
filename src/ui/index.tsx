import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { GlobalStateProvider } from './state';
import { setup as setupWebsocket } from './websockets';

let host = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'localhost';
let port = process.env.REACT_APP_API_PORT ? process.env.REACT_APP_API_PORT : '8080';
//@ts-ignore
setupWebsocket({ host: host, port: port, path: 'websocket' });

render(
  <GlobalStateProvider>
    <Router>
      <App />
    </Router>
  </GlobalStateProvider>,
  document.getElementById('root')
);
