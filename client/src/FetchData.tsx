import { useSetAtom } from "jotai";
import { authorsAtom } from "./States/authors";
import { booksAtom } from "./States/books";
import { useEffect } from "react";
import {AuthorClient, BookClient, GenreClient} from "./LibAPI";
import {genresAtom} from "./States/genres.ts";
import {toast} from "react-hot-toast";

export function useFetchInitialData() {
  const setAuthors = useSetAtom(authorsAtom);
  const setBooks = useSetAtom(booksAtom);
  const setGenres = useSetAtom(genresAtom);

  useEffect(() => {
    const authorClient = new AuthorClient();
    const bookClient = new BookClient();
    const genreClient = new GenreClient();

    authorClient.getAuthors()
      .then((data) => setAuthors(data))
      .catch((err) => toast.error("Error fetching authors", err));

    bookClient.getBooks()
      .then((data) => setBooks(data))
      .catch((err) => toast.error("Error fetching books", err));

    genreClient.getGenre()
      .then((data) => setGenres(data))
      .catch((err) => toast.error("Error fetching genres", err));
  }, [setAuthors, setBooks, setGenres]);

}
