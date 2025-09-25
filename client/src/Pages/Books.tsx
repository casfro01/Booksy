import { useAtomValue } from "jotai";
import { booksAtom } from "../States/books";
import type { BaseBookResponse } from "../LibAPI";

export default function Books() {
  const books = useAtomValue(booksAtom);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      {books.length === 0 ? (
        <p>Ingen bøger</p>
      ) : (
        <ul className="space-y-2">
          {books.map((book: BaseBookResponse) => (
            <li
              key={book.id}
              className="p-3 border rounded-lg shadow-sm bg-gray-50"
            >
              <span className="font-semibold">{book.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
