import {useNavigate, useParams} from "react-router";
import {authorsAtom} from "../States/authors.ts";
import {useAtom} from "jotai";
import "../CSS/DaisyUI.css"
import {getRandomImgAuthor} from "./GetRandomImgAuthor.tsx";
import {toast} from "react-hot-toast";
import {useState} from "react";
import {authorClient} from "../States/api-clients.ts";
import type {UpdateAuthorDto} from "../LibAPI.ts";

type authorIDParameter = {
    authorID: string;
}

export default function AuthorInfo(){
    const params = useParams<authorIDParameter>();
    const navigator = useNavigate();

    const [editMode, setEditMode] = useState<boolean>(false)
    const [newName, setNewName] = useState<boolean>("");

    const [authors, ] = useAtom(authorsAtom)

    const currentAuthor = authors.find(a => a.id === params.authorID);

    return <>
        <div className="bg-emerald-700 min-h-screen p-6">
            <div className="h-30">
                <div className="h-10"></div>
                <div className="flex grid-cols-3 gap-2 w-100">
                    <div className="w-10"></div>
                    <button className="btn w-25" onClick={() => navigator("/authors")}>Back</button>
                    <div className="w-15"></div>
                    <p className="text-white">Edit</p>
                    <input type="checkbox" checked={editMode} className="toggle toggle-secondary"
                    onChange={e => {
                        setEditMode(e.target.checked);
                    }}/>
                    <button onClick={async () => {
                        if (currentAuthor == undefined || currentAuthor.id == null) return
                        const updateDTO: UpdateAuthorDto = {
                            id: currentAuthor.id,
                            name: newName,
                            booksIDs: currentAuthor.booksIDs}
                        await authorClient.updateAuthor(updateDTO).then(e => {
                            toast.success("Author successfully updated!");
                            currentAuthor.name = e.name
                            setEditMode(false);
                        }).catch(e => {
                            toast.error("Couldn't update author " + e.message);
                        })
                    }}
                        className="btn btn-primary w-12" hidden={!editMode}>Save</button>
                </div>
            </div>
            {/* Author info section */}
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src={getRandomImgAuthor(currentAuthor?.id)}
                        className="max-h-98 max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 hidden={editMode} className="text-5xl font-bold text-white">{currentAuthor?.name}</h1>
                        <input hidden={!editMode} className="text-5xl text-white" placeholder={currentAuthor?.name} onChange={e => setNewName(e.target.value)} />
                        <p className="py-6 text-base-200">
                            {currentAuthor?.name} is a passionate storyteller with a love for exploring new ideas and bringing characters to life.
                            Their works span across different genres, blending creativity with thoughtful insight.
                            When not writing, they enjoy reading widely, connecting with readers, and discovering fresh inspiration for future stories.
                        </p>
                    </div>
                </div>
            </div>

            {/* Books grid */}
            <div className="grid grid-cols-3 gap-6">
                {/*books.map(book => (
                    <div key={book.id}>
                    {bookCard(book)}
                    </div>
                ))*/}
            </div>
        </div>
    </>
}