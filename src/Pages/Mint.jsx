import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MintNavBar from '../Components/MintNavBar';
import Footer from '../Components/Footer';
import MintSuccessBanner from '../Components/MintSuccessBanner';
import MintFeaturedImg from '../Assets/images/Mint Page Featured Image.png';
import { Context } from '../ContextProvider';
import { TiWarning } from 'react-icons/ti';
import {useCurrentAccount,useSignTransaction } from '@mysten/dapp-kit';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { KioskClient, KioskTransaction, Network } from '@mysten/kiosk'
import { Transaction } from '@mysten/sui/transactions';

const Mint = () => {
    const { walletBalance, mintSuccessBanner, setMintSuccessBanner, walletAddress } = useContext(Context);
    const [formattedBalance, setFormattedBalance] = useState('0');
    const [timeLeft, setTimeLeft] = useState({});
    const [isMinting, setIsMinting] = useState(false);
    const [mintedCount, setMintedCount] = useState(0);
    const [isEligible, setIsEligible] = useState(false);
    const [mintPrice] = useState(15);
    const [isLoading, setIsLoading] = useState(true);
    const [hasWalletAddress, setHasWalletAddress] = useState(false);
    const navigate = useNavigate();
    const account = useCurrentAccount();

    const authorizedAddresses = [
        "0xc834672823e3deef5997225e511752f893e237787cb9623888c0528b5077658c".toLowerCase(),
        "0x08532a0efda8f92811c1cc31044dbd9b25e85283ab56ba23a7d622141bdc1d2f".toLowerCase(),
        "0xd39cc53c96a9c8f1209407f0829dd5cb5777254a719984a6a6d12343c1937900".toLowerCase(),
        "0x5c82a1d47bf86befc93b57a760994fe8bf82129b669e4f14f0ac5e6fd5c4ecda".toLowerCase(),
        "0x8206bfcaeabf3e87138d4548a2cf1dab89874f214274211abbb649ad6aa56d5e".toLowerCase(),
        "0x7551731e56f8e75f41c08da7431109e126e3ad3844f1113594b78d2f59e5fdc5".toLowerCase(),
        "0x5429b03c43a4704ab83ab7cdc2dd719a86acfd99df0f50fdf5b65da37b33922c".toLowerCase(),
        "0x96ac5da4718848fc0fcd8c2d3ee29c462433cc45fb890cbc077411c665e67b92".toLowerCase(),
    ];

    const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
    const kioskClient = new KioskClient({client: suiClient,network:  Network.TESTNET});
	const { mutateAsync: signTransaction } = useSignTransaction();
    const [wlnfts, setWlNfts] = useState([]);
    const PACKAGE = '0xd6ab30b271c66daee6fb38bb49e25d94e98ecfb525e163ec322ed60341e0b272';
    const WL_TYPE = '0xf8783aaad0185dd36c74992a1026d17780533f57a3fcbd2e382cac8697a033c0::nordicLegends::Wl';
    const MINT_CONFIG = '0x558af79ea6776df2e74ab7b88c1bec286dd81f604c8caa879fd723bb267a9c0c';
    const MINT_PRICE = 0.1;

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

    useEffect(() => {
        if (mintSuccessBanner) {
            setTimeout(() => setMintSuccessBanner(false), 10000);
        }
    }, [mintSuccessBanner]);

    useEffect(() => {
        if (account?.address) {
            console.log('Account Address: ' + account.address);
            getMintedCount();
            load();
        }
    }, [account]);

    const getMintedCount = async () => {
        try {
            const object = await suiClient.getObject({
                id: MINT_CONFIG, options: { showContent: true }
            });
            console.log('Minted Count:', object);
            setMintedCount(Number(object.data.content.fields.minted));
        } catch (error) {
            console.error("Failed to fetch minted count:", error);
        }
    };

    const handleMint = async () => {
        if(wlnfts.length < 1 ) return;
        console.log('Minting in progress...');
        const tx = new Transaction();
        /*const [coin] = tx.splitCoins(tx.gas, [MINT_PRICE * 1e9]);
        tx.moveCall({
            target: PACKAGE + '::nordicLegends::public_mint',
            //typeArguments: [ WL_TYPE],
            arguments: [
              tx.object(MINT_CONFIG),
              //tx.object(item),
              coin
            ],
        });*/
        wlnfts.map(async (nft) => { 
            const [coin] = tx.splitCoins(tx.gas, [MINT_PRICE * 1e9]);
            const kioskTx = new KioskTransaction({
                transactionBlock: tx,
                kioskClient,
                suiClient,
                cap:nft.cap,
            });
            let wlnft = kioskTx.borrowTx({
                itemType: WL_TYPE,
                itemId: nft.objectId,
            },(item) => {       
               tx.moveCall({
                target: PACKAGE + '::nordicLegends::whitelist_mint',
                typeArguments: [ WL_TYPE ],
                arguments: [
                  tx.object(MINT_CONFIG),
                  tx.object(item),
                  coin
                ],
              });
             });
        }); 

        try {
            // execute the programmable transaction
            const { bytes, signature, reportTransactionEffects } = await signTransaction({
                transaction: tx,
            })
            const executeResult = await suiClient.executeTransactionBlock({
              transactionBlock: bytes,
              signature: signature,
              options: {
                showRawEffects: true,
              },
            });
            reportTransactionEffects(executeResult?.rawEffects);
            console.log('Minted successfully!', executeResult)
            setMintSuccessBanner(true);
            return true
          } catch (e) {
            console.error('NL nft mint failed', e)
            return false
          }
    };

    const load = async () => {
        let address = account?.address;
        //let address = "0x9194f5e12f46e7b8827ae941c05115c896ce881c3854be1c91cc23c08fe8515d";
        try {
            const { kioskOwnerCaps, kioskIds } = await kioskClient.getOwnedKiosks({
              address: address,
            })
            console.log(kioskOwnerCaps)
            let kiosk_id = ''
            let objectsWords = await Promise.all(
              kioskOwnerCaps?.map(async kiosk_cap => {
                let kiosk_objects = await kioskClient.getKiosk({
                  id: kiosk_cap.kioskId,
                  options: {
                    withKioskFields: true,
                    withListingPrices: true,
                    withObjects: true,
                    objectOptions: { showContent: true },
                  },
                })
                kiosk_objects.items.map(item => { item.cap = kiosk_cap });
                kiosk_objects.items = kiosk_objects?.items?.filter(
                  item =>
                    item?.type === WL_TYPE,
                )
                return kiosk_objects?.items;
              }),
            )
            objectsWords = objectsWords.filter(item => item)
            objectsWords = [].concat.apply([], objectsWords);
            if(objectsWords?.length > 0){
                setIsEligible(true)
                setWlNfts(objectsWords)
            }else{
                //setIsEligible(false)
                setWlNfts([])
            }
            console.log(objectsWords)
          } catch (e) {
            console.log(e)
          }
    }

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
                                            isEligible && wlnfts.length > 0
                                                ?
                                                <p className='eligible'>Eligible {wlnfts.length > 0  ? ' for ' + wlnfts.length: ''}  🟢</p>
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
                                            {/* disabled={!isEligible || mintedCount >= 300 || !isMinting || formattedBalance < 15} Mint Button works when eligibility is true, mintedCount is less than 300, and isMinting is false, wallet balance is greater than or equal to 15 SUI or if the wallet has minted one of our collection already  */}
                                            <button
                                            
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