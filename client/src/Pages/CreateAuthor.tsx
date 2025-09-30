import React, { useState } from 'react';
import { ArrowLeft, User} from 'lucide-react';
import { useNavigate } from 'react-router';
import '../CSS/CreateBook.css';
import {toast} from "react-hot-toast";
import {useAtom} from "jotai";
import {authorsAtom} from "../States/authors.ts";
import type {BaseAuthorResponse, CreateAuthorDto} from "../LibAPI.ts";
import {authorClient} from "../States/api-clients.ts";

interface FormData {
    name: string;
}

async function handeAuthorCreate(formData: FormData, loading: boolean, authors: BaseAuthorResponse[], setLoading: CallableFunction, setAuthorsAtom: CallableFunction): Promise<void> {
    if (loading) return;
    setLoading(true);
    const createAuthorDTO: CreateAuthorDto = {
        name: formData.name,
        booksIDs: [] // TODO : hvis man vil tilføje bøger så er det selvføgelig her ;)
    }
    await authorClient.createAuthor(createAuthorDTO)
        .then(a => {
            setAuthorsAtom([...authors, a]);
        })
        .catch(e => toast.error("Could not create Author: " + e.message));
}


export default function CreateAuthor() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false); // just in case
    const [authors, setAuthorsAtom] = useAtom(authorsAtom);

    const [formData, setFormData] = useState<FormData>({
        name: '',
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
        toast.promise(
            handeAuthorCreate(formData, loading, authors, setLoading, setAuthorsAtom), {
                loading: "Creating Author...",
                success: "Author Created",
                error: "Couldn't create book"
            })
            .then( ()=>{
                setLoading(false);
                navigate('/authors');
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
                <button className="back-button" onClick={() => navigate('/authors')}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className="page-title">Become an Author</h1>
            </div>

            {/* Main Content */}
            <div className="form-container">
                <div className="form-content">
                    {/* Input Grid */}
                    <div className="input-grid">
                        {/* Book Title */}
                        <div className="input-group">
                            <label className="input-label">
                                <User className="inline-icon" size={16} />
                                Author Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="input-field"
                                placeholder="E.g. Your Name"
                            />
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="button-section">
                        <button
                            type="button"
                            className="draft-button"
                            hidden={true} // TODO : fjern når dette bliver en realitet
                            onClick={handleSaveDraft}
                        >Save as Draft</button>
                        <button
                            type="submit"
                            className="submit-button"
                            onClick={handleSubmit}
                        >Create Author</button>
                    </div>
                </div>
            </div>
        </div>
    );
}