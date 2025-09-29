import {useParams} from "react-router";
import {authorsAtom} from "../States/authors.ts";
import {useAtom} from "jotai";
import "../CSS/DaisyUI.css"
import {getRandomImgAuthor} from "./GetRandomImgAuthor.tsx";

type authorIDParameter = {
    authorID: string;
}

export default function AuthorInfo(){
    const params = useParams<authorIDParameter>();

    const [authors, ] = useAtom(authorsAtom)

    const currentAuthor =authors.find(a => a.id === params.authorID);

    return <>
        <div className="bg-emerald-700 min-h-screen p-6">
            <div className="h-30">
                <div className="h-10"></div>
                <div className="grid grid-cols-14 gap-2 w-100"><div className=""></div><button className="btn w-25">Back</button></div>
            </div>
            {/* Author info section */}
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src={getRandomImgAuthor()}
                        className="max-h-98 max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold text-white">{currentAuthor?.name}</h1>
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