import { useInView } from 'react-intersection-observer';
import NFTInfoImage from '../Assets/images/NFT Info.png'
import MintingDetailsInfo from '../Assets/images/Minting Info.png'

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
        <img src={NFTInfoImage} alt="" />
        <img src={MintingDetailsInfo} alt="" />
      </div>
    </div>
  );
};

export default ImportantInfo;
