// FetchData.tsx
import { useSetAtom } from "jotai";
import { authorsAtom } from "./States/authors";
import { booksAtom } from "./States/books";
import { useEffect } from "react";
import { AuthorClient, BookClient } from "./LibAPI";

export function useFetchInitialData() {
  const setAuthors = useSetAtom(authorsAtom);
  const setBooks = useSetAtom(booksAtom);

  useEffect(() => {
    const authorClient = new AuthorClient("http://localhost:5004");
    const bookClient = new BookClient("http://localhost:5004");

    authorClient.getAuthors()
      .then((data) => setAuthors(data))
      .catch((err) => console.error("Error fetching authors", err));

    bookClient.getBooks()
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books", err));
  }, [setAuthors, setBooks]);
}
