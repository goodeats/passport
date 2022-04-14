import React, { useContext } from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AdminPage from './Pages/AdminPage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import './main.css';
import { myContext } from './Pages/ContextPage';
import RegisterPage from './Pages/RegisterPage';

function App() {
  const ctx = useContext(myContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {ctx ? (
          <>
            <Route path="/profile" element={<ProfilePage />}></Route>
            {ctx.isAdmin && (
              <Route path="/admin" element={<AdminPage />}></Route>
            )}
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route
              path="/register"
              element={<RegisterPage />}
            ></Route>
          </>
        )}
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
