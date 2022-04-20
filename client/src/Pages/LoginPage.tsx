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
      .then(
        (res) => {
          if (res.status === 200) {
            window.location.href = '/';
          }
        },
        () => {
          console.log('failure');
        }
      );
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
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}
