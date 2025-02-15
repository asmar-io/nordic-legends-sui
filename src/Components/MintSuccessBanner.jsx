import { MdCancel } from 'react-icons/md';
import MintSuccessFeaturedImage from '../Assets/images/Mint Success Featured Image.png';
import { useContext } from 'react';
import { Context } from '../ContextProvider';

const MintSuccessBanner = () => {
    const { handleMintSuccessBanner } = useContext(Context);
    return (
        <div>
            <div className='mint-success-banner'>
                <div className='mint-success-banner-content-top'>
                    <h1>Successful Mint</h1>
                    <MdCancel onClick={handleMintSuccessBanner} />
                </div>
                <div className='mint-success-banner-content-middle'>
                    <img src={MintSuccessFeaturedImage} alt="Warrior Helmet" />
                </div>
                <div className='mint-success-banner-content-bottom'>
                    <p>Congratulations you’ve successfully minted a Warrior or Shieldmaiden. Board the ship and lets go raid to Valhalla!!!</p>
                    <p>Trade on <a href="tradeport.xyz">tradeport.xyz</a></p>
                </div>
            </div>
        </div>
    )
}

export default MintSuccessBanner
