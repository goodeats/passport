import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { myContext } from './ContextPage';

export default function AdminPage() {
  const ctx = useContext(myContext);
  const [data, setData] = useState<any>();
  const [selectedUser, setSelectedUser] = useState<string>();

  useEffect(() => {
    axios
      .get('http://localhost:4000/getAllUsers', {
        withCredentials: true,
      })
      .then((res: any) => {
        setData(
          res.data.filter((user: any) => {
            return user.username !== ctx.username;
          })
        );
      });
  }, [ctx.username]);

  const deleteUser = () => {
    const user = data.find(
      (user: any) => user.username === selectedUser
    );
    axios
      .post(
        'http://localhost:4000/deleteUser',
        { id: user._id },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    data && (
      <div>
        <h1>Admin Page</h1>
        <select
          name="deleteuser"
          id="select"
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option key="default" id="default" value="default">
            Select A User
          </option>
          {data.map((user: any) => {
            return (
              <option
                key={user.username}
                id={user.username}
                value={user.username}
              >
                {user.username}
              </option>
            );
          })}
        </select>
        <button onClick={deleteUser}>Delete User</button>
      </div>
    )
  );
}
