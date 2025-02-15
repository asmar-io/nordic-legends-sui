import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import WalletConnectFeaturedImg from '../Assets/images/Connect Wallet FeaturedImg.png';
import SuiColoredLogo from '../Assets/images/Sui Colored Logo.png';
import SuietLogo from '../Assets/images/Suiet-logo.png';
import NightlyLogo from '../Assets/images/Nightly-logo.png';
import MetamaskLogo from '../Assets/images/Metamask-Logo.png';
import MartianLogo from '../Assets/images/Martian-Logo.png';
import SurfWalletLogo from '../Assets/images/Surf-wallet-logo.png';
import MintNavBar from '../Components/MintNavBar';

const ConnectWallet = () => {
    // const walletOptions = [
    //     {
    //         name: 'Sui Wallet',
    //         logo: SuiColoredLogo
    //     },
    //     {
    //         name: 'Suiet',
    //         logo: SuietLogo
    //     },
    //     {
    //         name: 'Stashed',
    //         logo: NightlyLogo
    //     },
    //     {
    //         name: 'Surf Wallet',
    //         logo: SurfWalletLogo
    //     },
    // ]

    return (
        <div className='wallet-connect-page'>
            <MintNavBar />
            <div className='wallet-connect-container'>
                <img className='wallet-connect-featured-img' src={WalletConnectFeaturedImg} alt="A Legendary NFT" />
                <div className='wallet-options'>
                    <h1>Connect Wallet</h1>
                    <div className='wallet-options-container'>
                        <div className='wallet-option'>
                            <img className='wallet-option-img' src={SuiColoredLogo} alt='Sui Logo' />
                            <p>Sui Wallet</p>
                        </div>
                        <div className='wallet-option'>
                            <img className='wallet-option-img' src={SuietLogo} alt='Suiet Logo' />
                            <p>Suiet</p>
                        </div>
                        <div className='wallet-option'>
                            <img className='wallet-option-img' src={MartianLogo} alt='Stached Logo' />
                            <p>Martian</p>
                        </div>
                        <div className='wallet-option'>
                            <img className='wallet-option-img' src={SurfWalletLogo} alt='Sui Logo' />
                            <p>Surf Wallet</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ConnectWallet
