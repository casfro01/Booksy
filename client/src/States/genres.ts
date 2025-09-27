// States/books.ts
import { atom } from "jotai";
import type {BaseGenreResponse} from "../LibAPI";

export const genresAtom = atom<BaseGenreResponse[]>([]);