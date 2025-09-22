import { Instagram, Play, Facebook } from 'lucide-react';
import "../CSS/Homescreen.css"
import { useNavigate } from 'react-router';

export default function HomeScreen() {
        const navigate = useNavigate();

        return (
            <div id='background'>
            {/* Header */}
            <div className='header'>
                <div className='header-content'>
                    <div className='logo-container'>
                        <img src={"logo-transparent-bandw.png"} alt="logo" id='logosize'/>
                    </div>
                    <span className='booksy-text'>Booksy</span>
                </div>
            </div>

            {/* Main Content */}
            <div id='maincontent'>
                {/* Left side - Image */}
                <div className='left-side'>
                    <div className='browser-window'>
                        {/* Browser header simulation */}
                        <div className='browser-header'>
                            <div className='browser-dot red'></div>
                            <div className='browser-dot yellow'></div>
                            <div className='browser-dot green'></div>
                        </div>
                        <img src={"logo1.png"} alt="logo" className='main-logo'/>
                    </div>
                </div>

                {/* Right side - Content */}
                <div className='right-side'>
                    <h1 className='main-heading'>
                        Rent a book or send your child away!
                    </h1>

                    {/* Button Grid */}
                    <div className='button-grid'>
                        {['ABOUT BOOKSY', 'CLASSES OFFERED', 'RENT A BOOK', 'SEND CHILD AWAY'].map((text) => (
                            <button key={text} className='grid-button'
                                onClick={() => {
                                    if (text === 'RENT A BOOK') {
                                        navigate('/create-book');
                                    }
                                    else if (text === 'ABOUT BOOKSY') {
                                        navigate('/about');
                                    }
                            }}
                                >
                                {text}
                            </button>
                        ))}
                    </div>

                    {/* Contact Button */}
                    <button className='contact-button'>
                        CONTACT DETAILS
                    </button>

                    {/* Social Media Icons */}
                    <div className='social-icons'>
                        <button className='social-button'>
                            <Instagram size={24}/>
                        </button>
                        <button className='social-button'>
                            <Play size={24} />
                        </button>
                        <button className='social-button facebook'>
                            <Facebook size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}