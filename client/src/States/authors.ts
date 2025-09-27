import { atom } from "jotai";
import type {BaseAuthorResponse} from "../LibAPI.ts";

export const authorsAtom = atom<BaseAuthorResponse[]>([])