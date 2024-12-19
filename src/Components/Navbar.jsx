import { Link } from 'react-router-dom';
import { Navigations } from './utils';
import HamburgerBtn from '../Assets/images/Hamburger-btn.png'
import { useState } from 'react';
import { MdCancel } from "react-icons/md";

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
            </ul>
          </div>
        </>
      }
      <div className='mobile-nav'>
        {!hamburgerState && <img src={HamburgerBtn} className='hamburger' onClick={handleHamburgerState} alt="Hamburger Menu" />}
        {
          hamburgerState &&
          <div className={`mobile-nav-container ${hamburgerState ? 'open' : 'closed'}`}>
            <div className='mobile-nav-logo-container'>
              <div className='logo'>
                <h2>NORDIC LEGENDS</h2>
              </div>
              <MdCancel className='cancel-nav-btn' onClick={() => setHamburgerState(!hamburgerState)}/>
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