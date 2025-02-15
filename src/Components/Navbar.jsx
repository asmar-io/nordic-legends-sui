import { Link } from 'react-router-dom';
import { Navigations } from './utils';
import HamburgerBtn from '../Assets/images/Hamburger-btn.png'
import { useState, useEffect } from 'react';
import { MdCancel } from "react-icons/md";
import '@mysten/dapp-kit/dist/index.css';
import { SiSui } from "react-icons/si";
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import SuiLogo from '../Assets/images/SuiLogo.png';
import { useContext } from 'react';
import { Context } from '../ContextProvider';


const Navbar = () => {

  const [hamburgerState, setHamburgerState] = useState(false);

  const handleHamburgerState = () => {
    setHamburgerState(!hamburgerState);
  };

  const currentAccount = useCurrentAccount();

  const { walletAddress, setWalletAddress } = useContext(Context);

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-3)}`;
  };

  useEffect(() => {
    if (currentAccount) {
      setWalletAddress(currentAccount.address);
    } else {
      setWalletAddress(null);
    }
  }, [currentAccount, setWalletAddress]);

  return (
    <div className='container header'>
      {
        !hamburgerState &&
        <>
          <div className='logo'>
            <h2>NORDIC LEGENDS</h2>
          </div>
          <div className='desktop-nav'>
            <ul>
              {Navigations.map((navigation) => {
                return (
                  <li className='navigation' key={navigation.id}>
                    <a className='navigation-link' href={navigation.url}>{navigation.name}</a>
                  </li>
                )
              })}
              <ConnectButton style={{
                background: 'linear-gradient(to left, #006bf9, #00c1fa)'
              }}
                className='mint-connect-wallet-btn'
                connectText={
                  <div className='connect-wallet-btn'>
                    <img src={SuiLogo} alt="" />
                    <p>{walletAddress ? truncateAddress(walletAddress) : 'Connect Wallet'}</p>
                  </div>
                }
              />
            </ul>
          </div>

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
              {Navigations.map((navigation) => {
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

export default Navbar;