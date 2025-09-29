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

export function getRandomImgAuthor() {
    const imgs = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10]
    return imgs[Math.floor(Math.random() * imgs.length)]
}