import axios from 'axios';
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

// https://reactjs.org/docs/context.html
export const myContext = createContext<any>({});
export default function ContextPage(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<any>();

  // specified an empty array as a dependency to the useEffect React hook
  // So we have ensured that the fetch request happens only once
  // www.wisdomgeek.com/development/web-development/react/avoiding-race-conditions-memory-leaks-react-useeffect/
  // reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    axios
      .get('http://localhost:4000/user', { withCredentials: true })
      .then((res: { data: any }) => {
        setUser(res.data);
        console.log('got user');
      });
  }, []);

  return (
    <myContext.Provider value={user}>
      {props.children}
    </myContext.Provider>
  );
}
