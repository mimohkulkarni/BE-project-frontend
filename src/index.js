import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import axios from 'axios';

// axios.get("http://localhost:8080/api/checkHealth",{username:"mimohkulkarni17@gmail.com",password:"pass",rememberMe:1}).then(res => console.log(res));
// axios.post("http://localhost:8080/api/login",{username:"mimohkulkarni17@gmail.com",password:"pass",rememberMe:1}).then(res => console.log(res));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
