import React, { useEffect, useState } from 'react';
import Warrior1 from '../Assets/images/Sneak-Peaks/Warrior-Base.jpg';
import Warrior2 from '../Assets/images/Sneak-Peaks/Common-Warrior-Base.jpg';
import Warrior3 from '../Assets/images/Sneak-Peaks/Common-Warrior-Base-2.jpg';
import ShieldMaiden1 from '../Assets/images/Shield_Maiden_1.png';

const Collections = () => {
  const images = [
    Warrior3,
    ShieldMaiden1,
    Warrior2,
    Warrior1,
    Warrior2,
    ShieldMaiden1,
    Warrior3,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="container collections-container">
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#00C1FACC',
          width: '120px',
          height: '120px',
          zIndex: '-10',
          filter: 'blur(70px)',
          left: '0px',
          top: '0px',
        }}
      ></div>
      <div className="collections-text">
        <p>Explore our newly released NFT collection</p>
        <h1>Our Collection</h1>
      </div>
      <div className="carousel">
        {images.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === currentIndex ? 'active' : ''
            }`}
            style={{
              transform: `translateX(${100 * (index - currentIndex)}%)`,
            }}
          >
            <img src={img} alt={`NFT ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
