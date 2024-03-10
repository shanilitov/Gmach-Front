import React from 'react';
import { useState, useEffect } from 'react';
import logo from '../../../CSSFiles/Images/NewLogo1.PNG';
import companyLogo from "../../../CSSFiles/Images/NewLogo.PNG";
import "../../../CSSFiles/StylePage.css";

function CustomBar(props) {
    let darkBlue = props.blue;//Yes or no. Use this prop to determine the color of the bar

    useEffect(() => {
        window.onscroll = function () {
            scrollFunction();
        };
    }, []);

    function scrollFunction() {
        if (darkBlue == 'yes') {
            const customBar = document.querySelector(".CustomBar2");
            const logoElement = document.getElementById("CBarLogo");
            if (customBar && logoElement) {
                if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200  ) {
                    customBar.style.padding = "0%";
                    logoElement.style.width = "25%";
                    customBar.style.height = "20%";
                    logoElement.style.width = "20%";
                } else {
                    customBar.style.padding = "0%";
                    customBar.style.height = "40%";   
                    logoElement.style.width = "30%";
                    logoElement.style.width = "45%";
               }
            }
        }
        else {
            const customBar = document.querySelector(".CustomBar");
            const logoElement = document.getElementById("CBarLogo");
            if (customBar && logoElement) {
                if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                    customBar.style.padding = "2%";
                    logoElement.style.width = "25%";
                    customBar.style.height = "20%";

                } else {
                    customBar.style.padding = "5%";
                    logoElement.style.width = "50%";
                    customBar.style.height = "25%";


                }
            }
        }


    }
    if (darkBlue == 'yes') {
        return (
            <nav className='CustomBar2' style={{
                overflow: 'hidden',
                padding: "0%",
                height: "45%",
                transition: ' 0.4s',
                position: "fixed",
                width: "100%",
                top: "0",
                zIndex: "99",
                backgroundColor: "rgb(0, 32, 96)"
            }}>
                <div>
                    <img src={companyLogo} alt='Logo' id='CBarLogo' style={{
                        height: "auto",
                        width: "45%",
                        transition: "0.4s",
                        fontSize: "35px",
                        marginTop: "0%",
                        paddingTop: "0%",
                        marginLeft: "5%",
                        position: "fixed",
                    }} />
                </div>
            </nav>
        )
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



