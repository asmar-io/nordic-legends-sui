import { Link } from 'react-router-dom';
import { Navigations } from './utils';
import HamburgerBtn from '../Assets/images/Hamburger-btn.png'
import { useState } from 'react';
import { MdCancel } from "react-icons/md";
import '@mysten/dapp-kit/dist/index.css';
import { SiSui } from "react-icons/si";
import { ConnectButton } from '@mysten/dapp-kit';
import SuiLogo from '../Assets/images/SuiLogo.png'

const Navbar = () => {

  const [hamburgerState, setHamburgerState] = useState(false);

  const handleHamburgerState = () => {
    setHamburgerState(!hamburgerState);
  }

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
                  <>
                    <li className='navigation'>
                      <a className='navigation-link' key={navigation.id} href={navigation.url}>{navigation.name}</a>
                    </li>
                  </>
                )
              })}
              <ConnectButton style={{
                background: 'linear-gradient(to left, #006bf9, #00c1fa)'
              }}
                connectText={
                  <div className='connect-wallet-btn'>
                    <img src={SuiLogo} alt="" /> <p>Connect Wallet</p>
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
            <ConnectButton style={{
              background: 'linear-gradient(to left, #006bf9, #00c1fa)',
              marginRight: '10px'
            }}
              connectText={
                <div className='connect-wallet-btn'>
                  <img src={SuiLogo} alt="" /> <p>Connect Wallet</p>
                </div>
              }
            />
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
                  <>
                    <li className='navigation mobile-nav-links'>
                      <a className='navigation-link' key={navigation.id} href={navigation.url}>{navigation.name}</a>
                    </li>
                  </>
                )
              })}
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar;