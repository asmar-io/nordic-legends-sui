import Warrior1 from '../Assets/images/Warrior_1.png';
import ShieldMailden1 from '../Assets/images/Shield_Maiden_1.png';
import { useState, useEffect, useRef } from 'react';

const CollectionsInfo = () => {
  const [warriorsVisible, setWarriorsVisible] = useState(false);
  const [shieldMaidensVisible, setShieldMaidensVisible] = useState(false);

  const warriorsRef = useRef(null);
  const shieldMaidensRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (entry.target === warriorsRef.current) {
            setWarriorsVisible(true);
          } else if (entry.target === shieldMaidensRef.current) {
            setShieldMaidensVisible(true);
          }
        }
      },
      { threshold: 0.3 } // Trigger animation when 30% of the section is visible
    );

    if (warriorsRef.current) observer.observe(warriorsRef.current);
    if (shieldMaidensRef.current) observer.observe(shieldMaidensRef.current);

    return () => {
      if (warriorsRef.current) observer.unobserve(warriorsRef.current);
      if (shieldMaidensRef.current) observer.unobserve(shieldMaidensRef.current);
    };
  }, []);

  return (
    <div className='container collections-info-container'>
      <div className='collections-explian'>
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#006AF8',
            width: '1000px',
            height: '200px',
            zIndex: '-10px',
            filter: 'blur(350px)',
            right: '0px',
            top: '0px',
          }}
        ></div>
        <p>The Nordic Legends NFT Collection</p>
        <p>
          The Warriors and Shieldmaidens are the first to enter the fray, forming the backbone of your raiding party. These NFTs are not just collectibles—they will serve you well in future conquests and expansions as we continue to grow the Nordic Legends universe.
        </p>
      </div>
      <div
        ref={warriorsRef}
        className={`warriors-container ${warriorsVisible ? 'fade-in-up' : ''}`}
      >
        <div className='warriors-info'>
          <div className='warrior-details'>
            <h2>Warriors</h2>
            <p>
              The Warriors are the heart of your raiding party, fearless and relentless in their pursuit of victory. They lead the charge in your raids and quests, ensuring that your clan grows stronger with each battle.
            </p>
          </div>
          <div className='warrior-collection-details'>
            <h2>Collection Details:</h2>
            <p>Total Size: 300 NFTs</p>
            <p>Warriors (180 NFTs)</p>
            <ul>
              <li>Common Warriors (90)</li>
              <li>Rare Warriors (60)</li>
              <li>Epic Warriors (20)</li>
              <li>Legendary Warriors (10)</li>
            </ul>
          </div>
        </div>
        <img className='warriors-img' src={Warrior1} alt="Warrior" />
      </div>
      <div
        ref={shieldMaidensRef}
        className={`shield-maidens-container ${shieldMaidensVisible ? 'fade-in-up' : ''}`}
      >
        <img className='shield-maidens-img' src={ShieldMailden1} alt="Shieldmaiden" />
        <div className='shield-maidens-container-info'>
          <div className='shieldmaiden-details'>
            <h2>Shieldmaidens</h2>
            <p>
              The Shieldmaidens are the elite, rare warriors of your clan. Known for their strength and unwavering resolve, they stand alongside the Warriors, ready to protect and serve their clan in times of need. Their presence in your collection symbolizes courage and honor, making them invaluable members of your raiding force.
            </p>
          </div>
          <div className='shieldmaiden-collection-details'>
            <h2>Collection Details:</h2>
            <p>Total Size: 300 NFTs</p>
            <p>Warriors (120 NFTs)</p>
            <ul>
              <li>Rare Shieldmaidens (70)</li>
              <li>Epic Shieldmaidens (30)</li>
              <li>Mythic Shieldmaidens (20)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsInfo;
