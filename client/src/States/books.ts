// States/books.ts
import { atom } from "jotai";
import type { BaseBookResponse } from "../LibAPI";

export const booksAtom = atom<BaseBookResponse[]>([]);