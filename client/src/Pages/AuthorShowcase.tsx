import "../CSS/DaisyUI.css"
import type {BaseAuthorResponse} from "../LibAPI.ts";
import {authorsAtom} from "../States/authors.ts";
import {useAtomValue, useAtom} from "jotai";
import {type NavigateFunction, useNavigate} from 'react-router';
import {getRandomImgAuthor} from "./GetRandomImgAuthor.tsx";
import deleteImg from "../assets/delete.png";
import {toast} from "react-hot-toast";
import {authorClient} from "../States/api-clients.ts";
import {useState} from "react";

type AuthorCardProps = { // for at es-lint ikke brokker sig ig
    author: BaseAuthorResponse;
    navigator: NavigateFunction;
};

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
                        {AuthorCard({author, navigator})}
                        <br/>
                        </>
                    )

                })
            }
        </div>
    </>
}

function useRemoveAuthor(author: BaseAuthorResponse | null){
    const [, setAuthors] = useAtom(authorsAtom);

    if (author == null) return;

    setAuthors(authors =>
        authors.filter(a => a.id !== author.id));
}


function AuthorCard({ author, navigator }: AuthorCardProps){
    const [notMouseOver, setNotMouseOver] = useState<boolean>(true);
    return <>
    <div className="card card-side bg-base-100 shadow-sm w-128"
         onMouseEnter={() => setNotMouseOver(false)}
        onMouseLeave={() => setNotMouseOver(true)}>
        <figure>
            <img
                className="h-75 w-52"
                src={getRandomImgAuthor(author.id)}
                alt="Author"/>
        </figure>
        <div className="card-body">
            <div className="h-1"></div>
            <div className="flex justify-end h-9 w-95/100">
                <img className="h-8 w-8 hoverMouse"
                src={deleteImg}
                 hidden={notMouseOver}
                onClick={async ()=> {
                    if (confirm("Are you sure you want to delete this author?")) {
                        if (confirm("Are you REALLY SURE you want to delete " + author.name + "?")) {
                            if (confirm("Are you 100% sure you want to delete this author?")) {
                                if (author.id != null) { // altså den er et lille brokkehoved
                                    let ans: BaseAuthorResponse | null = null;
                                    await authorClient.deleteAuthor(author.id)
                                        .then(res =>{
                                            ans = res;
                                        })
                                        .catch(e => toast.error("Unable to delete author: " + e.message));
                                    // eslint-disable-next-line react-hooks/rules-of-hooks
                                    useRemoveAuthor(ans);
                                }
                                toast.error("Unable to delete author")

                            }
                        }
                    }
                }}/>
            </div>
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