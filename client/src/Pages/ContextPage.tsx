import axios from 'axios'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'

// https://reactjs.org/docs/context.html
export const myContext = createContext<any>({})
export default function ContextPage(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    axios.get('http://localhost:4000/user', {withCredentials: true}).then((res: { data: any; }) => {
      setUser(res.data);
    });
  })

  return (
    <myContext.Provider value={user}>
      {props.children}
    </myContext.Provider>
  )
}
