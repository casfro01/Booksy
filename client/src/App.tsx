import Homescreen from "./Homescreen";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <RouterProvider router={createBrowserRouter([
            {
                path: "/",
                element: <Outlet></Outlet>,
                children:[
                {
                    path: "/",
                    element: <Homescreen/>
                },
                {
                    path: "/books",
                    element: <p>books</p>
                }
                ]
            }
        ])}
        />
    </>
  )
}

export default App
