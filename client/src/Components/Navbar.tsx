import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { myContext } from '../Pages/ContextPage';

export default function Navbar() {
  const ctx = useContext(myContext);

  const logout = () => {
    axios
      .get('http://localhost:4000/logout', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        window.location.href = '/';
      });
  };

  return (
    <div className="NavContainer">
      {ctx ? (
        <>
          <Link to="/logout" onClick={logout}>
            Logout
          </Link>
          {ctx.isAdmin && <Link to="/admin">Admin</Link>}
          <Link to="/profile">Profile</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      <Link to="/">Home</Link>
    </div>
  );
}
