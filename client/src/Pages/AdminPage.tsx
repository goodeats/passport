import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserInterface } from '../interfaces/interfaces';
import { myContext } from './ContextPage';

export default function AdminPage() {
  const ctx = useContext(myContext);
  const [data, setData] = useState<UserInterface[]>();
  const [selectedUser, setSelectedUser] = useState<string>();

  useEffect(() => {
    axios
      .get('http://localhost:4000/getAllUsers', {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setData(
          res.data.filter((user: UserInterface) => {
            return user.username !== ctx.username;
          })
        );
      });
  }, [ctx.username]);

  const deleteUser = () => {
    // we know there will be data and won't be null
    const user = data!.find(
      (user: any) => user.username === selectedUser
    );
    axios
      .post(
        'http://localhost:4000/deleteUser',
        { id: user!.id },
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
          {data.map((user: UserInterface) => {
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
