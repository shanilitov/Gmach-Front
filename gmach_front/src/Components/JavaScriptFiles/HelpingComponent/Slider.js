import React, { useState, useEffect } from 'react';
import "../../../CSSFiles/StylePage.css";

export default function Slider() {
    const [slideIndex, setSlideIndex] = useState(1);

    useEffect(() => {
        showSlides(slideIndex);
    }, [slideIndex]);

    function plusSlides(n) {
        if (n < 0) {
            if (slideIndex >1)
            console.log("BIGGER?? slideIndex: ", slideIndex);
                setSlideIndex(slideIndex + n);
        }
        if (slideIndex < 3)
        console.log("SMALLER?? slideIndex: ", slideIndex);
            setSlideIndex(slideIndex + n);
    }

    function currentSlide(n) {
        setSlideIndex(n);
    }

    function showSlides(n) {
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            setSlideIndex(1);
        }
        if (n < 1) {
            setSlideIndex(slides.length);
        }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].style.opacity = "0";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].style.opacity = "1";
        dots[slideIndex - 1].className += " active";
    }

    return (
        <div>
            {/* Slideshow container */}
            <div className="slideshow-container">

                {/* Full-width images with number and caption text */}
                <div className="mySlides fade">
                    <div className="numbertext">1 / 3</div>
                    <img src="https://img.freepik.com/free-photo/saving-money-concept-preset-by-male-hand-putting-money-coin-stack-growing-business-arrange-coins-into-heaps-with-hands-content-about-money_1150-45705.jpg" style={{ height: "50%", width:"auto" }} />
                    <div className="text">Caption Text</div>
                </div>

                <div className="mySlides fade">
                    <div className="numbertext">2 / 3</div>
                    <img src="https://media.istockphoto.com/id/1542679122/photo/father-and-son-coin-bank.webp?b=1&s=170667a&w=0&k=20&c=0vrMPSi6H9VJ2VeVoxTDuvEKK4v5PFDEaPQ7UYWEVCU=" style={{ height: "50%" ,  width:"auto"}} />
                    <div className="text">Caption Two</div>
                </div>

                <div className="mySlides fade">
                    <div className="numbertext">3 / 3</div>
                    <img src="https://media.istockphoto.com/id/1503371245/photo/percentage-sign-on-top-of-coin-stacks-before-blue-financial-graph.webp?b=1&s=170667a&w=0&k=20&c=iMNT5BdW-v-hi1sy9MpkxdFllh3Ab2Qq_NQhZ3ZQdzc=" style={{ height: "50%",  width:"auto" }} />
                    <div className="text">Caption Three</div>
                </div>

                {/* Next and previous buttons */}
                <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
            </div>
            <br />

            {/* The dots/circles */}
            <div style={{ textAlign: "center" }}>
                <span className="dot" onClick={() => currentSlide(1)}></span>
                <span className="dot" onClick={() => currentSlide(2)}></span>
                <span className="dot" onClick={() => currentSlide(3)}></span>
            </div>
        </div>
    );
}