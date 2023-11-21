import React from 'react';
import Header from './Header';
import logo from '../../../CSSFiles/Images/NewLogo1.PNG';
import { useState, useEffect } from 'react';



function CustomBar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`CustomBar ${isScrolled ? '' : 'small'}`}>
            <div>
                <h2>Custom Bar</h2>
                <img src={logo} alt='Logo' />
            </div>
        </div>
    );
}

export default CustomBar;
