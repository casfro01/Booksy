import React, { useState } from 'react';
import { ArrowLeft, Book, MapPin, Calendar, Truck } from 'lucide-react';
import { useNavigate } from 'react-router';
import '../CSS/Child.css';

interface ChildData {
    childName: string;
    destination: string;
    weight: string;
    pickupDate: string;
    deliveryType: string;
    notes: string;
}

export default function Child() {
    const navigate = useNavigate();

    const [childData, setChildData] = useState<ChildData>({
        childName: '',
        destination: '',
        weight: '',
        pickupDate: '',
        deliveryType: '',
        notes: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setChildData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Child scheduled:', childData);
        alert('Pickup scheduled successfully!');
        navigate('/');
    };

    return (
        <div className="child-container">
            {/* Header */}
            <div className="header">
                <button className="back-button" onClick={() => navigate('/')}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className="page-title">Send Child Away</h1>
            </div>

            {/* Main Content */}
            <div className="form-container">
                <div className="form-content">
                    {/* Input Grid */}
                    <div className="input-grid">
                        {/* Child Name */}
                        <div className="input-group">
                            <label className="input-label">
                                <Book className="inline-icon" size={16} />
                                Child Name *
                            </label>
                            <input
                                type="text"
                                name="childName"
                                value={childData.childName}
                                onChange={handleInputChange}
                                required
                                className="input-field"
                                placeholder="Whats the name of the child?"
                            />
                        </div>

                        {/* Destination */}
                        <div className="input-group">
                            <label className="input-label">
                                <MapPin className="inline-icon" size={16} />
                                Destination *
                            </label>
                            <input
                                type="text"
                                name="destination"
                                value={childData.destination}
                                onChange={handleInputChange}
                                required
                                className="input-field"
                                placeholder="Preffered destination?"
                            />
                        </div>

                        {/* Weight */}
                        <div className="input-group">
                            <label className="input-label">
                                <Book className="inline-icon" size={16} />
                                Weight (kg) *
                            </label>
                            <input
                                type="number"
                                name="weight"
                                value={childData.weight}
                                onChange={handleInputChange}
                                required
                                min="0"
                                step="0.1"
                                className="input-field"
                                placeholder="*optional - for body positivity reasons*"
                            />
                        </div>

                        {/* Pickup Date */}
                        <div className="input-group">
                            <label className="input-label">
                                <Calendar className="inline-icon" size={16} />
                                Pickup Date *
                            </label>
                            <input
                                type="date"
                                name="pickupDate"
                                value={childData.pickupDate}
                                onChange={handleInputChange}
                                required
                                className="input-field"
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        {/* Delivery Type */}
                        <div className="input-group">
                            <label className="input-label">
                                <Truck className="inline-icon" size={16} />
                                Delivery Type *
                            </label>
                            <select
                                name="deliveryType"
                                value={childData.deliveryType}
                                onChange={handleInputChange}
                                required
                                className="select-field"
                            >
                                <option value="">Select delivery type</option>
                                <option value="standard">Standard (5-7 days)</option>
                                <option value="express">Express (2-3 days)</option>
                                <option value="overnight">Overnight</option>
                                <option value="international">International</option>
                            </select>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="notes-section">
                        <label className="input-label">Special Instructions (Optional)</label>
                        <textarea
                            name="notes"
                            value={childData.notes}
                            onChange={handleInputChange}
                            rows={4}
                            className="textarea-field"
                            placeholder="Any special handling instructions or notes..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="button-section">
                        <button
                            type="submit"
                            className="submit-button"
                            onClick={handleSubmit}
                        >
                            Schedule Pickup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}