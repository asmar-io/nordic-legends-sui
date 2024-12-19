import { useEffect, useRef } from 'react';
import NordicLegendsImg1 from '../Assets/images/Nordic-Legends_img1.png';
import NordicLegendsImg2 from '../Assets/images/Nordic-Legends_img2.png';

const CommunityInfo = () => {
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe each section
    if (img1Ref.current) observer.observe(img1Ref.current);
    if (img2Ref.current) observer.observe(img2Ref.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => {
      // Cleanup observer on unmount
      if (img1Ref.current) observer.unobserve(img1Ref.current);
      if (img2Ref.current) observer.unobserve(img2Ref.current);
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  return (
    <div className='container community-info-container' id='community'>
      <img ref={img1Ref} src={NordicLegendsImg1} className='community-info-img' alt="Nordic Legends Text With A Pics in the Background" />
      <div ref={textRef} className='community-info-texts'>
        <h2>Community <br /> & <br /> Governance</h2>
        <p>
          At Nordic Legends, the community charts the course of the project. As a holder of RAID tokens, you’ll help decide the fate of this Viking realm, from new quest mechanics to character expansions. The power to shape the future rests in the hands of the raiders.
        </p>
      </div>
      <img ref={img2Ref} src={NordicLegendsImg2} className='community-info-img' alt="A Collection's Pics With a letter beside it" />
    </div>
  );
};

export default CommunityInfo;
