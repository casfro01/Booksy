import React, { useState } from 'react';
import { ArrowLeft, Book, User, FileText, Tag } from 'lucide-react';
import { useNavigate } from 'react-router';
import './CreateBook.css';

interface FormData {
    title: string;
    author: string;
    pages: string;
    genre: string;
    description: string;
}

export default function CreateBook() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        title: '',
        author: '',
        pages: '',
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
        alert('Book created successfully!');
        navigate('/');
    };

    const handleSaveDraft = () => {
        console.log('Saving draft:', formData);
        alert('Draft saved!');
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
                                <User className="inline-icon" size={16} />
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
                            />
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
                                <option value="fiction">Fiction</option>
                                <option value="non-fiction">Non-Fiction</option>
                                <option value="mystery">Mystery</option>
                                <option value="romance">Romance</option>
                                <option value="sci-fi">Science Fiction</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="biography">Biography</option>
                                <option value="history">History</option>
                                <option value="children">Children's Books</option>
                                <option value="textbook">Textbook</option>
                                <option value="cookbook">Cookbook</option>
                                <option value="self-help">Self Help</option>
                                <option value="poetry">Poetry</option>
                                <option value="drama">Drama</option>
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