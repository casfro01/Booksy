import Homescreen from "./Pages/Homescreen.tsx";
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import CreateBook from './Pages/CreateBook.tsx';  
import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import About from "./Pages/About.tsx";
import {Toaster} from "react-hot-toast";


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
                },
                {
                    path: "/about",
                    element: <About/>
                }
                ]
            }
        ])}
        />
        <Toaster position="top-center" reverseOrder={false}/>
    </>
  )
}

export default App
