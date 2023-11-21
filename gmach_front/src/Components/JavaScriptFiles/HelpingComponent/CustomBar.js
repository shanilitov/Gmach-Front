import React from 'react';
import Header from './Header';
import logo from '../../../CSSFiles/Images/NewLogo1.PNG';
import { useState, useEffect } from 'react';
import "../../../CSSFiles/StylePage.css";
import $ from 'jquery'; 
/*window.jQuery = $;
window.$ = $;*/


function CustomBar() {
    const [isScrolled, setIsScrolled] = useState(false);

   useEffect(() => {
        const handleScroll = () => {
            console.log("window.scrollY: " + window.scrollY + " type: " + typeof (window.scrollY) + "isScrolled: " + isScrolled)
            const scrollTop = window.scrollY;
            if (scrollTop > 300) {
                console.log("scrollTop > 300")
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrolled]);
    
   


    return (
        <div className='CustomBar' >
            <div>
                <img src={logo} alt='Logo' />
            </div>
        </div>
    );
}

export default CustomBar;
//style={{ height: isScrolled ? '80%' : '30%' }}
//className={`CustomBar ${isScrolled ? '' : 'small'}`}

/* $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 400) {
            $('.CustomBar').stop().animate({height: "30%"});
        }
        else {
             $('.CustomBar').stop().animate({height: "80%"});   
        }
    });*/