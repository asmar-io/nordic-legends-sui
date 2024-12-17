import { useEffect, useRef } from 'react';
import FooterImg from '../Assets/images/thor-footer-image.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerRef = useRef(null);
  const imgRef = useRef(null);
  const h1Ref = useRef(null);
  const pRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.2 }; // Trigger when 20% visible

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all elements
    if (footerRef.current) observer.observe(footerRef.current);
    if (imgRef.current) observer.observe(imgRef.current);
    if (h1Ref.current) observer.observe(h1Ref.current);
    if (pRef.current) observer.observe(pRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => {
      observer.disconnect(); // Cleanup observer
    };
  }, []);

  return (
    <div ref={footerRef} className='footer-container'>
      <div className='footer-info-container'>
        <img
          ref={imgRef}
          className='footer-img'
          src={FooterImg}
          alt="The legendary Thor"
        />
        <div className='footer-texts'>
          <h1 ref={h1Ref}>Join Our $RAID Party</h1>
          <p ref={pRef}>Check The Link Below To Join Our $RAID Party</p>
          <Link to={'https://linktr.ee/NordicLegends'}>
            <button ref={buttonRef}>Join now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;


























// import FooterImg from '../Assets/images/Footer_Img.png';

// const Footer = () => {
//     return (
//         <div className='footer-container'>
//             <img src={FooterImg} className='footer-img' alt="A Nordic Legend Pics" />
//             <div className='footer-texts'>
//                 <p>
//                     The Nordic Legends NFT Collection marks the beginning of a legendary journey. With Warriors and Shieldmaidens leading the charge, the genesis collection sets the stage for your Viking legacy. As the Raid Token launches, new characters, conquests, and opportunities will emerge, empowering you to Raid. Earn. Conquer.
//                 </p>
//                 <h1>The North awaits. Will you seize <br />your destiny?</h1>
//             </div>
//         </div>
//     )
// }

// export default Footer;