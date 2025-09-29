import "../CSS/DaisyUI.css"
import type {BaseAuthorResponse} from "../LibAPI.ts";
import {useAtomValue} from "jotai";
import {authorsAtom} from "../States/authors.ts";
import {type NavigateFunction, useNavigate} from 'react-router';
import {getRandomImgAuthor} from "./GetRandomImgAuthor.tsx";

export default function Authors(){
    const authors = useAtomValue(authorsAtom)
    const navigator = useNavigate();

    return <>
        <div className="flex flex-col items-center gap-6 bg-emerald-700">
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
                        {authorCard(author, navigator)}
                        <br/>
                        </>
                    )

                })
            }
        </div>
    </>
}


function authorCard(author: BaseAuthorResponse, navigator:NavigateFunction){
    return <>
    <div className="card card-side bg-base-100 shadow-sm w-128">
        <figure>
            <img
                className="h-75 w-52"
                src={getRandomImgAuthor()}
                alt="Movie" />
        </figure>
        <div className="card-body">
            <div className="h-9"></div>
            <h2 className="card-title justify-center">{author.name}</h2>
            <p className="flex justify-center">Click the button to explore this author.</p>
            <div className="card-actions">
                <div className="w-45"></div>
                <button className="btn btn-primary w-25 " onClick={() => navigator(""+author.id)}>Go To</button>
            </div>
            <div className="h-1"></div>
        </div>
    </div>
    </>
}