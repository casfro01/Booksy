import { useSetAtom } from "jotai";
import { authorsAtom } from "./States/authors";
import { booksAtom } from "./States/books";
import { useEffect } from "react";
import {authorClient, bookClient, genreClient} from "./States/api-clients.ts";
import {genresAtom} from "./States/genres.ts";
import {toast} from "react-hot-toast";

export function useFetchInitialData() {
  const setAuthors = useSetAtom(authorsAtom);
  const setBooks = useSetAtom(booksAtom);
  const setGenres = useSetAtom(genresAtom);

  useEffect(() => {
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
