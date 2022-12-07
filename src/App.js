import React from 'react';
import 'antd/dist/reset.css';
import './App.css';

import { Login } from './components/Login'
import { Header } from './components/Header';
import { SideMenu } from './components/SideMenu'
import { Routing } from './components/Routing'

function App() {
  // get token from backend
  const token = getToken();
  

  // check if credentials matches return a token
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div style={{"display": "flex", "flexDirection": "column", flex: 1, height: '100vh'}}>
      <Header />
      <div style={{"display": "flex", "flexDirection": "row", flex: 1}}>
          <SideMenu />
          <Routing /> 
      </div>
    </div>
  );
}

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

export default App;
