import "../CSS/DaisyUI.css";
import bookImageTemplate from "../assets/BookImgs/bookImageTemplate.png"

import type {BaseBookResponse} from "../LibAPI.ts";
import {useAtomValue} from "jotai";
import {booksAtom} from "../States/books.ts";
import {useNavigate} from 'react-router';
import {useState} from "react";
import {authorsAtom} from "../States/authors.ts";
import {genresAtom} from "../States/genres.ts";
import {BookCard} from "./BookCard.tsx";

export default function BooksShowcase() {
	const [toastMsg, setToastMsg] = useState<string | null>(null);
	const books = useAtomValue(booksAtom);
	const authors = useAtomValue(authorsAtom);
	const genres = useAtomValue(genresAtom);

	const navigator = useNavigate();
	const [selectedBook, setSelectedBook] = useState<BaseBookResponse | null>(null);

	return (
		<>
			<div className="flex flex-col items-center bg-emerald-700 gap-6">
				<br />
				<div className="flex h-25 w-full">
					<div className="flex w-2/5">
						<div className="w-15"></div>
						<button className="btn w-35" onClick={() => navigator("/")}>back</button>
					</div>
				</div>
				<br />
				<div className="grid grid-cols-3 gap-6">
					{books.map(book => (
						<div key={book.id}>
                            <BookCard book={book} onReadMore={() => setSelectedBook(book)}/>
						</div>
					))}
				</div>
			</div>

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
	)
}

