import Homescreen from "./Pages/Homescreen.tsx";
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import CreateBook from './Pages/CreateBook.tsx';  
import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import About from "./Pages/About.tsx";
import Books from "./Pages/Books.tsx";
import { useFetchInitialData } from "./FetchData.tsx";


function App() {
    useFetchInitialData();

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
                    element: <Books/>
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
    </>
    )
}

export default App
