import React, { createContext, PropsWithChildren } from 'react'

// https://reactjs.org/docs/context.html
export const myContext = createContext<any>({})
export default function ContextPage(props: PropsWithChildren<any>) {
  return (
    <myContext.Provider value={1000}>
      {props.children}
    </myContext.Provider>
  )
}
