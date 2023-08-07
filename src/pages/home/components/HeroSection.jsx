import React, { useState, useEffect } from 'react';
import "../styles/HeroSection.css"
import image1 from '../../../assets/Axion-Plastic-recycling-does-work.jpg';
import image2 from '../../../assets/Desktop - 2.jpg';
import image3 from '../../../assets/Desktop - 3.jpg';

const images = [
  image1,
  image2,
  image3
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);


  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <>
    <section className="hero">
      <div className="hero-slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((ima, index) => (
          <div className="slide" key={index}>
            <img src={ima} alt={`Ima ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="slide-buttons">
          <button className="slide-button" onClick={prevSlide}>
            &lt;
          </button>
          <button className="slide-button" onClick={nextSlide}>
            &gt;
          </button>
        </div>

    </section>

    <div className='text-area-1'>
      <p className='p1'>
      <h1>Welcome to RecyclPal</h1> where sustainable living meets community empowerment. 
      Immerse yourself in a world of convenience and fulfillment as you contribute 
      to the greater good of our planet. 
      Join forces with like-minded "Eco-Pals" to transform plastic recycling 
      into an engaging and rewarding journey. 
      Our unwavering commitment to reducing plastic pollution drives us to create 
      lasting impact, one city at a time. 
      Embrace the joy of making our eco-system better while reaping the rewards 
      of a cleaner, greener future. 
      Together, we'll shape a brighter tomorrow.
        </p>
        </div>

       

    </>
  );
};

export default HeroSection;