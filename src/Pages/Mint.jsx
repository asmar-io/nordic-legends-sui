import MintNavBar from '../Components/MintNavBar';
import MintFeaturedImg from '../Assets/images/Mint Page Featured Image.png';
import Footer from '../Components/Footer';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../ContextProvider';
import { TiWarning } from 'react-icons/ti';
import MintSuccessBanner from '../Components/MintSuccessBanner';


const Mint = () => {
    const { walletBalance, mintSuccessBanner, setMintSuccessBanner } = useContext(Context);
    const [formattedBalance, setFormattedBalance] = useState('0');
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isMinting, setIsMinting] = useState(false);
    const [mintedCount, setMintedCount] = useState(100);
    const [eligibility, setEligibility] = useState(true);
    const [mintPrice, setMintPrice] = useState(15);

    useEffect(() => {
        if (walletBalance) {
            // Convert balance from MIST to SUI (1 SUI = 1e9 MIST)
            const balanceInSui = Number(walletBalance) / 1e9;
            setFormattedBalance(balanceInSui.toFixed(2));
        }
    }, [walletBalance]);

    useEffect(() => {
        const targetDate = new Date('2025-02-22T08:00:00');

        const updateCountdown = () => {
            const now = new Date();
            // Minting Date Countdown
            // const difference = targetDate - now;

            // Minting D-Day Test
            const difference = 0

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
                setIsMinting(false);
            } else {
                setIsMinting(true);
            }
        };

        const timer = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call

        return () => clearInterval(timer);
    }, []);

    const handleMint = () => {
        console.log('Minting😛...');
        setMintSuccessBanner(true);
    }


    useEffect(() => {
        if (mintSuccessBanner) {
            setTimeout(() => {
                setMintSuccessBanner(false);
            }, 10000);
        }
    }, [mintSuccessBanner]);

    return (
        <div>
            <MintNavBar />
            {mintSuccessBanner && <MintSuccessBanner />}
            <div className='mint-page-container'>
                <div className='mint-page-content'>
                    <div className='mint-page-content-left'>
                        <img src={MintFeaturedImg} alt="A Legendary Warrior" />
                    </div>
                    <div className='mint-page-content-right'>
                        <div className='mint-page-content-right-container-top' style={{ color: '#fff' }}>
                            <div className='minting-status'>
                                {isMinting ? '' :
                                    <p>Time until minting:</p>
                                }
                                {isMinting ? (
                                    <div className='countdown-finish'>
                                        <span>MINTING 🟢</span>
                                    </div>
                                ) : (
                                    <div className='countdown'>
                                        <span>{timeLeft.days}d </span>
                                        <span>{timeLeft.hours}h </span>
                                        <span>{timeLeft.minutes}m </span>
                                        <span>{timeLeft.seconds}s</span>
                                    </div>
                                )}
                            </div>
                            <p className='raid-instruction'>Let's RAID against the tridal wave</p>
                            <h1 className='nft-name'>Nordic Legends</h1>
                            <p className='minting-instruction'>Bestowed by Odin, the Allfather, this WL NFT grants the right to claim your Warrior or Shieldmaiden in the Nordic Legends main collection mint.</p>
                        </div>
                        <div className='mint-page-content-right-container-bottom'>
                            <div className='price-et-eligibility'>
                                <div>
                                    <p>Mint Price</p>
                                    <h1>{mintPrice} SUI</h1>
                                    <p>Balance: {formattedBalance} SUI</p>
                                </div>
                                {
                                    eligibility
                                        ?
                                        <p className='eligible'>Eligible 🟢</p>
                                        :
                                        <p className='not-eligible'>Not Eligible 🔴</p>
                                }
                            </div>
                            <div className='minting-progress'>
                                <div className='progress-stats'>
                                    <p>{((mintedCount / 300) * 100).toFixed(2)}% minted</p>
                                    <p>{mintedCount}/300</p>
                                </div>
                                <div className='progress-bar-container'>
                                    <div
                                        className='progress-bar-fill'
                                        style={{
                                            width: `${(mintedCount / 300) * 100}%`
                                        }}
                                    />
                                </div>
                                <div className='mint-now-button'>
                                    <p><TiWarning /> One Per Wallet</p>
                                    {/* Mint Button works when eligibility is true, mintedCount is less than 300, and isMinting is false */}
                                    <button
                                        disabled={!eligibility || mintedCount >= 300 || !isMinting}
                                        onClick={handleMint}
                                    >
                                        Mint Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Mint;
