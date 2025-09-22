import Homescreen from "./Homescreen";
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import CreateBook from './CreateBook';  
import {createBrowserRouter, Outlet, RouterProvider} from "react-router";

function App() {
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
                },
                {
                    path: "/create-book", 
                    element: <CreateBook/>
                }
                ]
            }
        ])}
        />
    </>
  )
}

export default App
