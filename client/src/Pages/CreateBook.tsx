import React, { useState } from 'react';
import { ArrowLeft, Book, User, FileText, Tag } from 'lucide-react';
import { useNavigate } from 'react-router';
import '../CSS/CreateBook.css';
import {toast} from "react-hot-toast";
import {type BaseAuthorResponse, type BaseBookResponse, type CreateBookDto} from "../LibAPI.ts";
import {booksAtom} from "../States/books.ts";
import {useAtom, useAtomValue} from "jotai";
import {genresAtom} from "../States/genres.ts";
import {authorClient, bookClient} from "../States/api-clients.ts";
import {authorsAtom} from "../States/authors.ts";

interface FormData {
    title: string;
    author: string;
    pages: number;
    genre: string;
    description: string;
}

async function CreateAuthor(authorName: string, authors: BaseAuthorResponse[], setAuthorAtom: CallableFunction): Promise<BaseAuthorResponse | undefined> {
    await authorClient.createAuthor({name: authorName, booksIDs: []})
        .then(a => {
            setAuthorAtom([...authors, a]);
            toast.success("Author created successfully.");
            return a
        })
        .catch(e => {
            toast.error("Could not create new author: " + e.message);
            return undefined;
        })
    return undefined;
}

async function CrateBook(book: CreateBookDto, books: BaseBookResponse[], setBookAtom: CallableFunction) {
    await bookClient.createBook(book)
        .then(book => {
            setBookAtom([...books, book]);
        })
        .catch((error) => {
            toast.error("Book creation fail: " + error.message);
        });
}

async function handeBookCreate(formData: FormData, loading: boolean, authors: BaseAuthorResponse[], books: BaseBookResponse[], setLoading: CallableFunction, setAuthorsAtom: CallableFunction, setBookAtom: CallableFunction): Promise<void> {
    if (loading) return;
    setLoading(true);
    // find the author id
    let possibleAuthor = authors.find(a => a.name == formData.author);
    if (possibleAuthor == undefined){
        possibleAuthor = await CreateAuthor(formData.author, authors, setAuthorsAtom);
    }
    // if we couldn't create author ig
    if (possibleAuthor == undefined || possibleAuthor.id == undefined) return
    // define dto
    const newBook: CreateBookDto = {
        title: formData.title,
        pages: formData.pages,
        genreid: formData.genre,
        description: formData.description,
        authorsIDs: [possibleAuthor.id]
    };
    // create book
    await CrateBook(newBook, books, setBookAtom);

}

export default function CreateBook() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false); // just in case
    const [books, setBookAtom] = useAtom(booksAtom)
    const genres = useAtomValue(genresAtom);
    const [authors, setAuthorsAtom] = useAtom(authorsAtom);

    const [formData, setFormData] = useState<FormData>({
        title: '',
        author: '',
        pages: 0,
        genre: '',
        description: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Book created:', formData);
        toast.promise(
            handeBookCreate(formData, loading, authors, books, setLoading, setAuthorsAtom, setBookAtom), {
                loading: "Creating book...",
                success: "Book Created",
                error: "Couldn't create book"
            })
            .then( ()=>{
            setLoading(false);
            navigate('/');
            })
            .catch( () =>
                setLoading(false)
            );
    };

    const handleSaveDraft = () => {
        console.log('Saving draft:', formData);
        toast.success("Draft saved!");
    };

    return (
        <div className="create-book-container">
            {/* Header */}
            <div className="header">
                <button className="back-button" onClick={() => navigate('/')}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className="page-title">Create New Book</h1>
            </div>

            {/* Main Content */}
            <div className="form-container">
                <div className="form-content">
                    {/* Input Grid */}
                    <div className="input-grid">
                        {/* Book Title */}
                        <div className="input-group">
                            <label className="input-label">
                                <Book className="inline-icon" size={16} />
                                Book Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="input-field"
                                placeholder="Enter book title"
                            />
                        </div>

                        {/* Author */}
                        <div className="input-group">
                            <label className="input-label">
                                <User className="inline-icon" size={16}/>
                                Author *
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleInputChange}
                                required
                                className="input-field"
                                placeholder="Author name"
                                list="authorsList"
                            />
                            <datalist id="authorsList">
                                <option value=""></option>
                                {
                                    authors.map(a => {
                                        // Jeg giver op på at indsætte id'et her - for det virker anderledes end i en select - så jeg søger bare på forfatterens navn i stedet for at finde id'et, og hvis han ikke er der så, laver man en og indsætter id'et i bogen right
                                        return <option>{a.name}</option>
                                    })
                                }
                            </datalist>
                            {/*<input onChange={handleInputChange} type="hidden" name="authorID" id="authorsList-hidden"/>*/}
                        </div>

                        {/* Pages */}
                        <div className="input-group">
                            <label className="input-label">
                                <FileText className="inline-icon" size={16} />
                                Number of Pages *
                            </label>
                            <input
                                type="number"
                                name="pages"
                                value={formData.pages}
                                onChange={handleInputChange}
                                required
                                min="1"
                                className="input-field"
                                placeholder="e.g. 250"
                            />
                        </div>

                        {/* Genre */}
                        <div className="input-group">
                            <label className="input-label">
                                <Tag className="inline-icon" size={16} />
                                Genre *
                            </label>
                            <select
                                name="genre"
                                value={formData.genre}
                                onChange={handleInputChange}
                                required
                                className="select-field"
                            >
                                <option value="">Select genre</option>
                                {
                                    genres.map(g => {
                                        return <option value={g.id}>{g.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="description-section">
                        <label className="input-label">Description (Optional)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            className="textarea-field"
                            placeholder="Brief description of the book..."
                        />
                    </div>

                    {/* Submit Buttons */}
                    <div className="button-section">
                        <button
                            type="button"
                            className="draft-button"
                            onClick={handleSaveDraft}
                        >
                            Save as Draft
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                            onClick={handleSubmit}
                        >
                            Create Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}