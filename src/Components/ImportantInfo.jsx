import { useInView } from 'react-intersection-observer';

const ImportantInfo = () => {
  const { ref: headingRef, inView: headingInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: leftContainerRef, inView: leftInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: rightContainerRef, inView: rightInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="container important-info-container">
      <h2
        ref={headingRef}
        className={`important-info-heading ${headingInView ? 'fade-in-up' : ''}`}
      >
        *Important Information*
      </h2>
      <div className="important-informations">
        <div
          ref={leftContainerRef}
          className={`important-info important-info1 ${leftInView ? 'slide-in-left' : ''}`}
        >
          <p>For holding one (or more) of our NFTs you will be rewarded as follows:</p>
          <ul>
            <li>Airdrop of our $RAID token for each NFT you hold.</li>
            <li>Eligible for future partnership airdrops</li>
            <li>Exclusive giveaways and perks.</li>
            <li>OG role.</li>
            <li>Genesis collection will be linked to future gamification plans.</li>
          </ul>
        </div>
        <div
          ref={rightContainerRef}
          className={`important-info important-info2 ${rightInView ? 'slide-in-right' : ''}`}
        >
          <p>The Mint will be as follows:</p>
          <ul>
            <li>300 Piece collection on Sui network</li>
            <li>300 WL spots to mint.</li>
            <li>Mint price 15 Sui.</li>
            <li>Mint date TBA-December.</li>
            <li>Mint platform Tradeport</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImportantInfo;
