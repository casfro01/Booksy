import {useNavigate, useParams} from "react-router";
import {authorsAtom} from "../States/authors.ts";
import {useAtom, useAtomValue} from "jotai";
import "../CSS/DaisyUI.css"
import {getRandomImgAuthor} from "./GetRandomImgAuthor.tsx";
import {toast} from "react-hot-toast";
import {useState} from "react";
import {authorClient} from "../States/api-clients.ts";
import type {BaseAuthorResponse, BaseBookResponse, UpdateAuthorDto} from "../LibAPI.ts";
import {booksAtom} from "../States/books.ts";
import {BookCard} from "./BookCard.tsx";
import bookImageTemplate from "../assets/BookImgs/bookImageTemplate.png";
import {genresAtom} from "../States/genres.ts";

type authorIDParameter = {
    authorID: string;
}

export default function AuthorInfo(){
    const params = useParams<authorIDParameter>();
    const navigator = useNavigate();

    const [editMode, setEditMode] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>("");

    const [authors, ] = useAtom(authorsAtom)
    const [books, ] = useAtom(booksAtom)
    const genres = useAtomValue(genresAtom);

    const currentAuthor = authors.find(a => a.id === params.authorID);

    const authorSet = new Set(currentAuthor?.booksIDs);

    const [selectedBook, setSelectedBook] = useState<BaseBookResponse | null>(null);
    const [toastMsg, setToastMsg] = useState<string | null>(null);

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
                     alt="Author image"/>
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
            <div className="flex h-25 w-10/100 justify-end items-center">
                <details className="dropdown">
                    <summary className="btn m-1 w-11 btn-success">+ Book</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        {
                            books.map(b => {
                                if (b.id != null && !authorSet.has(b.id) && currentAuthor != null) {
                                    return (<li onClick={async () => {
                                        const value = await updateAuthorWithBooks(currentAuthor, b.id as string, true)
                                        const index = authors.findIndex(a => a.id === value.id);
                                        if (index > -1) authors[index] = value;
                                        window.location.reload(); // kan ikke lige finde på en bedre løsning wuhu for frontend TODO : måske finde en bedre løsning + ikke så meget dupe-kode
                                    }}
                                                key={b.id}><a>{b.title}</a></li>)
                                }
                            })
                        }
                    </ul>
                </details>

                <div className="w-6"></div>

                <details className="dropdown">
                    <summary className="btn m-1 w-11 btn-error">— Book</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        {
                            books.map(b => {
                                if (b.id != null && authorSet.has(b.id) && currentAuthor != null) {
                                    return (<li onClick={async () => {
                                        const value = await updateAuthorWithBooks(currentAuthor, b.id as string, false)
                                        const index = authors.findIndex(a => a.id === value.id);
                                        if (index > -1) authors[index] = value;
                                        window.location.reload(); // kan ikke lige finde på en bedre løsning wuhu for frontend TODO : måske finde en bedre løsning + ikke så meget dupe-kode
                                    }}
                                                key={b.id}><a>{b.title}</a></li>)
                                }
                            })
                        }
                    </ul>
                </details>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {books.map(book => {
                    if (book.id != null && authorSet.has(book.id)) return (<div key={book.id}>
                    <BookCard book={book} onReadMore={function(): void {
                            setSelectedBook(book)
                        } }/>
                    </div>)})}
            </div>
        </div>


        {/*TODO: Flyt ind i sin egen fil, da dette er duplikeret lol - kunne også bruge fragments?*/}
        {selectedBook && (
            <dialog id="book_modal" className="modal modal-open">
                <div className="modal-box max-w-3xl relative pb-8">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => setSelectedBook(null)}
                    >
                        ✕
                    </button>

                    <h3 className="font-bold text-2xl text-center mb-6">
                        {selectedBook.title}
                    </h3>

                    <div className="flex gap-8 px-4">
                        <img
                            className="w-40 h-60 !ml-2"
                            src={bookImageTemplate}
                            alt="Book Cover"
                        />

                        <div className="flex-1">
                            <p className="mb-8" style={{ marginBottom: "2rem" }}>
                                {selectedBook.description || "No description."}
                            </p>
                            <div className="grid grid-cols-2 gap-y-6 text-sm mt-6" style={{ marginTop: "1.5rem" }}>
                                <p><span className="font-semibold">Pages: </span> {selectedBook.pages || "N/A"}</p>
                                <p><span className="font-semibold">Genre: </span> {genres.find(g => g.id === selectedBook.genreid)?.name || "Unknown"}</p>
                                <p><span className="font-semibold">Created: </span> {new Date(selectedBook.createAt!).toLocaleDateString() || "N/A"}</p>
                                <p>
                                    <span className="font-semibold">Authors: </span>
                                    {selectedBook.authorsIDs?.length
                                        ? selectedBook.authorsIDs.map(id => authors.find(a => a.id === id)?.name).filter(Boolean).join(", ")
                                        : "Unknown"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {toastMsg && (
                        <div className="toast toast-end">
                            <div className="alert alert-success">
                                <span>{toastMsg}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center gap-4 mt-12 mb-12">
                        <button
                            className="btn btn-success w-16 px-12"
                            onClick={() => {
                                setToastMsg("Book rented!");
                                setTimeout(() => navigator("/"), 1500);
                            }}
                        >
                            Rent
                        </button>
                        <button
                            className="btn btn-outline w-16 px-12"
                            onClick={() => setSelectedBook(null)}
                        >
                            Close
                        </button>
                    </div>
                    <div className="h-6"></div>
                </div>
            </dialog>
        )}
    </>
}


async function updateAuthorWithBooks(author: BaseAuthorResponse, bookID: string, add: boolean): Promise<BaseAuthorResponse> {
    if (author == null || author.id == null) throw new Error("Author ID is required");

    const newAuthor = {...author};
    if (add)
        newAuthor.booksIDs = newAuthor.booksIDs != null ? [...newAuthor.booksIDs, bookID] : [bookID];
    else newAuthor.booksIDs = newAuthor.booksIDs?.filter(b => b != bookID);

    const updateDTO: UpdateAuthorDto = {id: author.id, name: newAuthor.name, booksIDs: newAuthor.booksIDs}
    await authorClient.updateAuthor(updateDTO)
        .then(res => {
            toast.success("Updated author")
            return res;
        })
        .catch(e => {
            toast.error("Cound not update author: " + e.message);
            throw new Error("Cound not update author: " + e.message);
        });
    return author; // dette gør lint glad
}