import axios from 'axios';
import React, { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const login = () => {
    axios
      .post(
        'http://localhost:4000/login',
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  const getUser = () => {
    axios
      .get('http://localhost:4000/user', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <button onClick={getUser}>Get Logged In User</button>
    </div>
  );
}
