import logo from './logo.svg';
import react from 'react'
import { useState } from 'react';
import './App.css';
import Form from './component/form';
import Login from './component/login';
import Signup from './component/signup'
import ButtonAppBar from './component/appbar';

import { Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<><ButtonAppBar/> <Form/></>}></Route>
      </Routes>
      <Routes>
        <Route path='/login' element={<><ButtonAppBar/> <Login/></>}></Route>
      </Routes>
      <Routes>
        <Route path='/signup' element={<><ButtonAppBar/> <Signup/></>}></Route>
      </Routes>
      
      
      
    </div>
  
  );
}

export default App;
