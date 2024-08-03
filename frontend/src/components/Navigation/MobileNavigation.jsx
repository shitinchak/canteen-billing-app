import {NavLink} from 'react-router-dom';
import home from '../../assets/SVG/House.svg';
import menu from '../../assets/SVG/Fork.svg';
import plus from '../../assets/SVG/plus-outline.svg';
import user from '../../assets/SVG/account.svg';

const MobileNavigation = () => {
  return(
    <>
    <footer>
    <nav className="navigation">
    <ul className="navigation__list">
      <li className={'navigation__item' }>
        <NavLink to='/oitems' className={({isActive}) => isActive ? 'navigation__button--active' : 'navigation__button'}>
          <img src={home} alt='home' />
        </NavLink>
      </li>
      <li className={'navigation__item' }>
        <NavLink to='/odashboard' className={({isActive}) => isActive ? 'navigation__button--active' : 'navigation__button'}>
          <img src={menu} alt='menu' />
        </NavLink>
      </li>
      <li className={'navigation__item' }>
        <NavLink to='/additem?mode=add' className={({isActive}) => isActive ? 'navigation__button--active' : 'navigation__button'}>
          <img src={plus} alt='add' />
        </NavLink>
      </li>
      <li className={'navigation__item' }>
        <NavLink to='/oprofile' className={({isActive}) => isActive ? 'navigation__button--active' : 'navigation__button'}>
          <img src={user} alt='user' />
        </NavLink>
      </li>
    </ul>
  </nav>
  </footer>
  </>
  )
};

export default MobileNavigation;