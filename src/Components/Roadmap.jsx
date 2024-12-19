import { useEffect, useRef } from 'react';
import RadmapImg from '../Assets/images/Roadmap Image.png';

const Roadmap = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate'); // Add animation class
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the image is visible
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <div className='container roadmap-container' id='roadmap'>
      <h1>ROADMAP</h1>
      <img
        ref={imageRef}
        className='roadmap-container-img'
        src={RadmapImg}
        alt="The Nordic Legend Roadmap"
      />
    </div>
  );
};

export default Roadmap;
