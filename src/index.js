import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom';
import {setup as setupWebsocket} from 'websockets';
import App from './App';
import 'index.css';

let host = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'localhost';
let port = process.env.REACT_APP_API_PORT ? process.env.REACT_APP_API_PORT : '8080';
setupWebsocket({host: host, port: port, path: 'websocket'});

const routes = (
  <BrowserRouter>
    <Route path='/' component={App} />
  </BrowserRouter>
);
export default routes;

ReactDOM.render(routes, document.getElementById('root'));
