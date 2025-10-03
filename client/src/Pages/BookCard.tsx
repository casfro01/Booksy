import "../CSS/DaisyUI.css"
import type {BaseBookResponse} from "../LibAPI.ts";
import bookImageTemplate from "../assets/BookImgs/bookImageTemplate.png"

type BookCardProps = { // for at es-lint ikke brokker sig ig
    book: BaseBookResponse,
    onReadMore: () => void
};

export function BookCard({book, onReadMore}: BookCardProps) {
    return (
        <div className="card card-side bg-base-100 shadow-sm w-128">
            <figure>
                <img
                    className="h-75 w-52"
                    src={bookImageTemplate}
                    alt="Book Cover"
                />
            </figure>
            <div className="card-body">
                <div className="h-4"></div>
                <h2 className="card-title justify-center">{book.title}</h2>
                <p className="flex justify-center line-clamp-3">{book.description || "No description available."}</p>
                <div className="card-actions">
                    <div className="w-45"></div>
                    <button className="btn btn-primary w-25" onClick={onReadMore}>Read more</button>
                </div>
                <div className="h-1"></div>
            </div>
        </div>
    )
}