import React from 'react';
import { useState, useEffect } from 'react';
import logo from '../../../CSSFiles/Images/NewLogo1.PNG';
import "../../../CSSFiles/StylePage.css";

function CustomBar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        window.onscroll = function () {
            scrollFunction();
        };
    }, []);

    function scrollFunction() {
        const customBar = document.querySelector(".CustomBar");
        const logoElement = document.getElementById("CBarLogo");

        if (customBar && logoElement) {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                customBar.style.padding = "5%";
                logoElement.style.width = "25%";
            } else {
                customBar.style.padding = "10%";
                logoElement.style.width = "50%";
            }
        }
    }

    return (
        <nav className='CustomBar' style={{
            overflow: 'hidden',
            padding: "10%",
            transition: ' 0.4s',
            position: "fixed",
            width: "100%",
            top: "0",
            zIndex: "99",
        }}>
            <div>
                <img src={logo} alt='Logo' id='CBarLogo' style={{
                    height: "auto",
                    width: "50%",
                    transition: "0.4s",
                    fontSize: "35px",
                    marginTop: "0%",
                    marginLeft: "5%",  
                    position: "fixed",  
                }} />
            </div>
        </nav>
    );
}

export default CustomBar;

   
/*useEffect(() => {
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
 }, [isScrolled]);*/

/* window.onscroll = function() {scrollFunction()};

 function scrollFunction() {
   if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
     document.getElementsByClassName("CustomBar").style.padding = "30px 10px";
     document.getElementById("logo").style.fontSize = "25px";
   } else {
     document.getElementsByClassName("CustomBar").style.padding = "80px 10px";
     document.getElementById("logo").style.fontSize = "35px";
   }
 }*/



