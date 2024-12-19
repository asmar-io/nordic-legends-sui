import React, { useEffect, useState } from 'react';
import Warrior1 from '../Assets/images/Sneak-Peaks/Warrior-Base.jpg';
import warrior4 from '../Assets/images/Sneak-Peaks/Screenshot_21-11-2024_22126_.jpeg'
import warrior5 from '../Assets/images/Warrior_5.jpeg'
import ShieldMaiden1 from '../Assets/images/Shield_Maiden_1.png';
import ShieldMaiden2 from '../Assets/images/Sneak-Peaks/Shieldmaiden-2.png'
import ShieldMaiden3 from '../Assets/images/Sneak-Peaks/Shieldmaiden-3.jpg'
import OneEyedWarrior1 from '../Assets/images/One-eyed-warrior1.png'

const Collections = () => {
  const images = [
    warrior4,
    ShieldMaiden1,
    ShieldMaiden2,
    Warrior1,
    OneEyedWarrior1,
    ShieldMaiden3,
    warrior5,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="container collections-container" id='collection'>
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
            <img className='collection-img' src={img} alt={`NFT ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
