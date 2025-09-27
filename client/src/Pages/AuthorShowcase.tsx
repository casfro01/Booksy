import "../CSS/DaisyUI.css"
import a1 from "../assets/AuthorImgs/author1.png"
import a2 from "../assets/AuthorImgs/author2.png"
import a3 from "../assets/AuthorImgs/author3.png"
import a4 from "../assets/AuthorImgs/author4.png"
import a5 from "../assets/AuthorImgs/author5.png"
import a6 from "../assets/AuthorImgs/author6.png"
import a7 from "../assets/AuthorImgs/author7.png"
import a8 from "../assets/AuthorImgs/author8.png"
import a9 from "../assets/AuthorImgs/author9.png"
import a10 from "../assets/AuthorImgs/author10.png"
import type {BaseAuthorResponse} from "../LibAPI.ts";
import {useAtomValue} from "jotai";
import {authorsAtom} from "../States/authors.ts";
import { useNavigate } from 'react-router';
export default function Authors(){
    const authors = useAtomValue(authorsAtom)
    const navigator = useNavigate();

    return <>
        <div className="container justify-items-center bg-emerald-700">
            <br/>
            <div className="flex h-25 w-full">
                <div className="flex w-2/5">
                    <div className="w-15"></div>
                    <button className="btn w-35" onClick={() => navigator("/")}>back</button>
                </div>
                <div className="flex w-1/2">
                    <div className="w-15"></div>
                    <button className="btn w-35">Become an Author</button>
                </div>
            </div>
            <br/>
            {
                authors.map(author => {
                    return (
                        <>
                        {authorCard(author)}
                        <br/>
                        </>
                    )

                })
            }
        </div>
    </>
}


function getRandomImg(){
    const imgs = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10]
    return imgs[Math.floor(Math.random() * imgs.length)]
}

function authorCard(author: BaseAuthorResponse){
    return <>
    <div className="card card-side bg-base-100 shadow-sm w-128">
        <figure>
            <img
                className="h-75 w-52"
                src={getRandomImg()}
                alt="Movie" />
        </figure>
        <div className="card-body">
            <div className="h-9"></div>
            <h2 className="card-title justify-center">{author.name}</h2>
            <p className="flex justify-center">Click the button to explore this author.</p>
            <div className="card-actions">
                <div className="w-45"></div>
                <button className="btn btn-primary w-25 ">Go To</button>
            </div>
            <div className="h-1"></div>
        </div>
    </div>
    </>
}