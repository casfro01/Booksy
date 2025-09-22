import '../CSS/About.css';
import { ArrowLeft, Book, Users, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="about-container">
            {/* Header */}
            <div className="header">
                <button className="back-button" onClick={() => navigate('/')}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className="page-title">About Booksy</h1>
            </div>

            {/* Main Content */}
            <div className="content-container">
                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-icon">
                        <Book size={64} />
                    </div>
                    <h2 className="hero-title">Welcome to Booksy</h2>
                    <p className="hero-subtitle">Your premier book rental and educational services platform</p>
                </div>

                {/* Main Description - THIS IS WHERE YOU ADD YOUR CONTENT */}
                <div className="description-section">
                    <div className="description-card">
                        <h3>Our Mission</h3>
                        <p>
                            {/* PUT YOUR SATIRICAL DESCRIPTION HERE */}
                            Wanna rent a book? or are you tired of your child? Perfect! 
                            We exist to make that problem disappear. At Booksy, 
                            we’re committed to giving parents peace, by 
                            sending their kids away to
                            learn about the important stuff, like Satan’s greatest accomplishments, 
                            the fabulousness of homosexuality, 
                            and the eternal mysteries of tuna fish.
                            Also fuck the republicans.
                        </p>
                    </div>

                    <div className="description-card">
                        <h3>Our Services</h3>
                        <p>
                            {/* PUT MORE CONTENT HERE */}
                            Child Offload™ – Ship them off, wave goodbye, and enjoy silence. 
                            We promise they’ll be somewhere else.
                            Hellbound Education – From fire pits to devilish doodles, your child will know Satan better than they know the alphabet.
                            Pride Prep School – Love is love, glitter is mandatory, and “straight” is just a direction on Google Maps.
                            Tuna Talks™ – We’ll ensure your kid develops unsolicited opinions about tuna that they’ll repeat at every family gathering.
                        </p>
                    </div>

                    <div className="description-card">
                        <h3>Why Choose Booksy?</h3>
                        <p>
                            {/* ADD ADDITIONAL SATIRICAL CONTENT HERE */}
                            Because ordinary childcare is boring and temporary. We don’t just watch your kid —we launch them. Yeet.
                        </p>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="features-section">
                    <h3>What We Offer</h3>
                    <div className="features-grid">
                        <div className="feature-card">
                            <Book className="feature-icon" size={32} />
                            <h4>Book Rentals</h4>
                            <p>Access to thousands of books for rental</p>
                        </div>
                        <div className="feature-card">
                            <Users className="feature-icon" size={32} />
                            <h4>Satanism</h4>
                            <p>Yes, we do that too.</p>
                        </div>
                        <div className="feature-card">
                            <Heart className="feature-icon" size={32} />
                            <h4>Consentration-camp package</h4>
                            <p>Building connections through traveling</p>
                        </div>
                        <div className="feature-card">
                            <Star className="feature-icon" size={32} />
                            <h4>Premium Service</h4>
                            <p>We tell your kid that theyre going to Narnia, but theyre not.</p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="contact-section">
                    <h3>Get In Touch</h3>
                    <p>Ready to join the Booksy community?</p>
                    <div className="contact-info">
                        <p>Email: info@booksy-or-child-gone.com</p>
                        <p>Phone: +45 66669123</p>
                        <p>Address: 69 Def A. Real Street, Horsens, 42069</p>
                    </div>
                </div>
            </div>
        </div>
    );
}