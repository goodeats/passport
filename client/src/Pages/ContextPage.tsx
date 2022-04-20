import axios, { AxiosResponse } from 'axios';
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { UserInterface } from '../interfaces/interfaces';

// https://reactjs.org/docs/context.html
// https://netbasal.com/getting-to-know-the-partial-type-in-typescript-ecfcfbc87cb6
export const myContext = createContext<Partial<UserInterface>>({});
export default function ContextPage(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<UserInterface>();

  // specified an empty array as a dependency to the useEffect React hook
  // So we have ensured that the fetch request happens only once
  // www.wisdomgeek.com/development/web-development/react/avoiding-race-conditions-memory-leaks-react-useeffect/
  // reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    axios
      .get('http://localhost:4000/user', { withCredentials: true })
      .then((res: AxiosResponse) => {
        setUser(res.data);
      });
  }, []);

  return (
    <myContext.Provider value={user!}>
      {props.children}
    </myContext.Provider>
  );
}
