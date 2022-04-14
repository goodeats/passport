import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AdminPage from './Pages/AdminPage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import './main.css'
import ContextPage from './Pages/ContextPage';

function App() {
  return (
    <BrowserRouter>
      <ContextPage>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/admin' element={<AdminPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/profile' element={<ProfilePage/>}></Route>
        </Routes>
      </ContextPage>
    </BrowserRouter>
  );
}

export default App;
