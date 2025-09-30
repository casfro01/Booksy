import a1 from "../assets/AuthorImgs/author1.png";
import a2 from "../assets/AuthorImgs/author2.png";
import a3 from "../assets/AuthorImgs/author3.png";
import a4 from "../assets/AuthorImgs/author4.png";
import a5 from "../assets/AuthorImgs/author5.png";
import a6 from "../assets/AuthorImgs/author6.png";
import a7 from "../assets/AuthorImgs/author7.png";
import a8 from "../assets/AuthorImgs/author8.png";
import a9 from "../assets/AuthorImgs/author9.png";
import a10 from "../assets/AuthorImgs/author10.png";

export function getRandomImgAuthor(seed: string = "") {
    const imgs = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10];
    const num = seed === ""  ? Math.random() : mulberry32(stringToSeed(seed));
    return imgs[Math.floor(num * imgs.length)];
}

function mulberry32(seed: number): number {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function stringToSeed(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32-bit integer
    }
    return hash;
}