import { useEffect, useRef } from 'react';
import stakingImg from '../Assets/images/stake-image.png'
import raidAndQuestImg from '../Assets/images/raid-and-quest-image.png';

const TokenDisplay = () => {
  const headingRef = useRef(null);
  const stakingRef = useRef(null);
  const raidRef = useRef(null);
  const nftRef = useRef(null);

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
    if (headingRef.current) observer.observe(headingRef.current);
    if (stakingRef.current) observer.observe(stakingRef.current);
    if (raidRef.current) observer.observe(raidRef.current);
    if (nftRef.current) observer.observe(nftRef.current);

    return () => {
      // Cleanup observer on unmount
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (stakingRef.current) observer.unobserve(stakingRef.current);
      if (raidRef.current) observer.unobserve(raidRef.current);
      if (nftRef.current) observer.unobserve(nftRef.current);
    };
  }, []);

  return (
    <div className='container token-display-container' id='raid'>
      <h2 ref={headingRef} className='token-display-heading'>
        RaidToken ($RAID)
      </h2>
      <div className='token-displays'>
        <div ref={stakingRef} className='staking-container'>
          <img src={stakingImg} alt="" />
          <h2>Staking</h2>
          <p>Earn rewards by staking RAID tokens and your NFTs.</p>
        </div>
        <div ref={raidRef} className='raid-container'>
          <img src={raidAndQuestImg} alt="" />
          <h2>Raids & Quests</h2>
          <p>RAID will power your future adventures, unlocking exclusive benefits.</p>
        </div>
        <div ref={nftRef} className='nft-container'>
          <img src={stakingImg} alt="" />
          <h2>Burn Mechanism</h2>
          <p>As tokens are used in the ecosystem, their supply decreases, adding value to those who continue to raid and conquer.</p>
        </div>
      </div>
    </div>
  );
};

export default TokenDisplay;
