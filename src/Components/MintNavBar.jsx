import { useContext, useState } from "react";
import { Context } from "../ContextProvider";
import { ConnectButton } from "@mysten/dapp-kit";
import SuiLogo from "../Assets/images/SuiLogo.png";
import HamburgerBtn from '../Assets/images/Hamburger-btn.png';
import { MdCancel } from "react-icons/md";
import { MintNavigations, Navigations } from './utils';


const MintNavBar = () => {
    const { walletAddress } = useContext(Context);
    const truncateAddress = (address) => {
        return address.slice(0, 6) + "..." + address.slice(-4);
    }

    const [hamburgerState, setHamburgerState] = useState(false);

    const handleHamburgerState = () => {
        setHamburgerState(!hamburgerState);
    };

    return (
        <div className='mint-nav-bar container header'>
            {
                !hamburgerState &&
                <>
                    <div className='logo'>
                        <h2>NORDIC LEGENDS</h2>
                    </div>
                    <div className="desktop-mint-nav">
                        {MintNavigations.map((navigation) => {
                            return (
                                <li className='mint-navigation' key={navigation.id}>
                                    <a className='navigation-link' href={navigation.url}>{navigation.name}</a>
                                </li>
                            )
                        })}
                    </div>
                    <ConnectButton style={{
                        background: 'linear-gradient(to left, #006bf9, #00c1fa)'
                    }}
                        className='mint-connect-wallet-btn'
                        connectText={
                            <div className='connect-wallet-btn mint-connect-wallet-btn'>
                                <img src={SuiLogo} alt="" />
                                <p>{walletAddress ? truncateAddress(walletAddress) : 'Connect Wallet'}</p>
                            </div>
                        }
                    />
                </>
            }
            <div className='mobile-nav'>
                {!hamburgerState &&
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        <img src={HamburgerBtn} className='hamburger' onClick={handleHamburgerState} alt="Hamburger Menu" />
                    </div>
                }
                {hamburgerState &&
                    <div className={`mobile-nav-container ${hamburgerState ? 'open' : 'closed'}`}>
                        <div className='mobile-nav-logo-container'>
                            <div className='logo'>
                                <h2>NORDIC LEGENDS</h2>
                            </div>
                            <MdCancel className='cancel-nav-btn' onClick={() => setHamburgerState(!hamburgerState)} />
                        </div>
                        <ul>
                            {MintNavigations.map((navigation) => {
                                return (
                                    <li className='navigation mobile-nav-links' key={navigation.id}>
                                        <a className='navigation-link' href={navigation.url}>{navigation.name}</a>
                                    </li>
                                )
                            })}
                            <ConnectButton style={{
                                background: 'linear-gradient(to left, #006bf9, #00c1fa)',
                                marginRight: '10px'
                            }}
                                connectText={
                                    <div className='connect-wallet-btn'>
                                        <img src={SuiLogo} alt="" />
                                        <p>{walletAddress ? truncateAddress(walletAddress) : 'Connect Wallet'}</p>
                                    </div>
                                }
                            />
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default MintNavBar;
