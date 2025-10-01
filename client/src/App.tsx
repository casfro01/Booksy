import Homescreen from "./Pages/Homescreen.tsx";
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import CreateBook from './Pages/CreateBook.tsx';  
import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import About from "./Pages/About.tsx";
import Books from "./Pages/BookShowcase.tsx";
import { useFetchInitialData } from "./FetchData.tsx";
import {Toaster} from "react-hot-toast";
import Authors from "./Pages/AuthorShowcase.tsx";
import AuthorInfo from "./Pages/AuthorInfo.tsx";
import CreateAuthor from "./Pages/CreateAuthor.tsx";


export function App() {
    useFetchInitialData();

    return (
    <>
        <header><title>Jens</title></header>
        
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
                    path: "/create-author",
                    element: <CreateAuthor/>
                },
                {
                    path: "/about",
                    element: <About/>
                },
                {
                    path: "/authors",
                    element: <Authors/>
                },
                {
                    path: "/authors/:authorID",
                    element: <AuthorInfo/>
                }
                ]
            }
        ])}
        />
        <Toaster position="top-center" reverseOrder={false}/>
    </>
    )
}


