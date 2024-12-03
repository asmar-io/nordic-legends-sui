import { Link } from 'react-router-dom';
import { Navigations } from './utils';

const Navbar = () => {
  return (
    <div className='container header'>
      <div className='logo'>
        <h2>NORDIC LEGENDS</h2>
      </div>
      <div className='navigations'>
        <ul>
          {Navigations.map((navigation) => {
            return (
              <>
                <li className='navigation'>
                  <Link className='navigation-link' key={navigation.id} to={navigation.url}>{navigation.name}</Link>
                </li>
              </>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Navbar;