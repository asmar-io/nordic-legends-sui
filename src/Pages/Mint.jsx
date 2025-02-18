import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MintNavBar from '../Components/MintNavBar';
import Footer from '../Components/Footer';
import MintSuccessBanner from '../Components/MintSuccessBanner';
import MintFeaturedImg from '../Assets/images/Mint Page Featured Image.png';
import { Context } from '../ContextProvider';
import { TiWarning } from 'react-icons/ti';

const Mint = () => {
    const { walletBalance, mintSuccessBanner, setMintSuccessBanner, walletAddress } = useContext(Context);
    const [formattedBalance, setFormattedBalance] = useState('0');
    const [timeLeft, setTimeLeft] = useState({});
    const [isMinting, setIsMinting] = useState(false);
    const [mintedCount, setMintedCount] = useState(100);
    const [isEligible, setIsEligible] = useState(false);
    const [mintPrice] = useState(15);
    const [isLoading, setIsLoading] = useState(true);
    const [hasWalletAddress, setHasWalletAddress] = useState(false);
    const navigate = useNavigate();

    const authorizedAddresses = [
        "0xc834672823e3deef5997225e511752f893e237787cb9623888c0528b5077658c".toLowerCase()
    ];

    useEffect(() => {
        if (walletBalance) {
            setFormattedBalance((Number(walletBalance) / 1e9).toFixed(2));
        }
    }, [walletBalance]);

    useEffect(() => {
        const targetDate = new Date('2025-02-21T16:00:00Z');
        const updateCountdown = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
                setIsMinting(false);
            } else {
                setIsMinting(true);
            }
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (walletAddress) {
            setHasWalletAddress(true);
            const checkEligibility = async () => {
                setIsLoading(true);

                const normalizedWallet = walletAddress.toLowerCase().trim();
                const isAuthorized = authorizedAddresses.includes(normalizedWallet);

                console.log('Wallet Address:', normalizedWallet);
                console.log('Authorized Addresses:', authorizedAddresses);
                console.log('Is Authorized:', isAuthorized);

                setIsEligible(isAuthorized);

                if (!isAuthorized) {
                    navigate('/');
                }

                setIsLoading(false);
            };

            checkEligibility();
        } else {
            setHasWalletAddress(false);
            setIsEligible(false); // Reset eligibility when walletAddress is null
        }
    }, [walletAddress, navigate]);

    useEffect(() => {
        console.log("isEligible changed to:", isEligible);
    }, [isEligible]);

    const handleMint = () => {
        console.log('Minting in progress...');
        setMintSuccessBanner(true);
    };

    useEffect(() => {
        if (mintSuccessBanner) {
            setTimeout(() => setMintSuccessBanner(false), 10000);
        }
    }, [mintSuccessBanner]);


    return (
        <div>
            <MintNavBar />
            {mintSuccessBanner && <MintSuccessBanner />}
            {
                !hasWalletAddress ? (
                    <h1 style={{ color: '#fff', textAlign: 'center' }}>Connecting to Wallet...</h1>
                ) : isLoading ? (
                    <h1 style={{ color: '#fff', textAlign: 'center' }}>Checking Eligibility...</h1>
                ) : !isEligible ? (
                    <h1 style={{ color: '#fff', textAlign: 'center' }}>You are not authorized. Please connect and authorize your wallet.</h1>
                ) : (
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
                                                <span>{timeLeft.days}d</span>
                                                <span>{timeLeft.hours}h</span>
                                                <span>{timeLeft.minutes}m</span>
                                                <span>{timeLeft.seconds}s</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className='raid-instruction'>Let's RAID against the tridal wave</p>
                                    <h1 className='nft-name'>Nordic Legends</h1>
                                    <p className='minting-instruction'>Warriors & Shieldmaidens – The fearless core of the Nordic Legends. From common and rare to the ultra-rare Legendary Warriors and Mythic Shieldmaidens, these battle-hardened Vikings stand ready for glory. Mint your LEGEND and join the fight!</p>
                                </div>
                                <div className='mint-page-content-right-container-bottom'>
                                    <div className='price-et-eligibility'>
                                        <div>
                                            <p>Mint Price</p>
                                            <h1>{mintPrice} SUI</h1>
                                            <p>Balance: {formattedBalance} SUI</p>
                                        </div>
                                        {
                                            isEligible
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
                                            {/* Mint Button works when eligibility is true, mintedCount is less than 300, and isMinting is false, wallet balance is greater than or equal to 15 SUI or if the wallet has minted one of our collection already  */}
                                            <button
                                                disabled={!isEligible || mintedCount >= 300 || !isMinting || formattedBalance < 15}
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
                )
            }
            <Footer />
        </div>
    );
};

export default Mint;




// {
//     !hasWalletAddress ? (
//         <div>Connecting to Wallet...</div>
//     ) : isLoading ? (
//         <div>Checking Eligibility...</div>
//     ) : !isEligible ? (
//         <div>You are not authorized. Please connect and authorize your wallet.</div>
//     ) : ()
// }