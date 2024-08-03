import './DesktopNavbar.css';
import { Utensils } from 'lucide-react';
import { Link, NavLink, useNavigate, Form } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutStudent } from '../../actions/studentAction';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
const DesktopNavbar = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  function logoutStudentFunction() {
    dispatch(logoutStudent());
    alert.success('Logout Successful');
    navigate('/');
  }

  const clg = localStorage.getItem('clg');

  const { isAuthenticated, student } = useSelector((state) => state.student);
  return (
    <div className="nb-main">
      <nav className="nb-con">
        <Link to="/">
          <Utensils />
        </Link>
        <NavLink
          to={(clg && '/oitems') || (isAuthenticated && '/menu') || '/'}
          className={({ isActive }) =>
            isActive ? 'nb-link--active' : 'nb-link'
          }
        >
          <li className="nb-li">
            {(clg && 'Items') || (isAuthenticated && 'Menu') || 'Home'}
          </li>
        </NavLink>
        <NavLink
          to={clg ? '/odashboard' : '/'}
          className={({ isActive }) =>
            isActive ? 'nb-link--active' : 'nb-link'
          }
        >
          <li className="nb-li">{clg ? 'Dasboard' : 'Support'}</li>
        </NavLink>
        <NavLink
          to={clg ? '/additem?mode=add' : '/'}
          className={({ isActive }) =>
            isActive ? 'nb-link--active' : 'nb-link'
          }
        >
          <li className="nb-li">{clg ? 'Add Item' : 'About'}</li>
        </NavLink>
        {!isAuthenticated ? (
          <NavLink
            to={!clg && '/ologin'}
            className={({ isActive }) =>
              isActive ? 'nb-link--active' : 'nb-link'
            }
          >
            <li className="nb-li">{!clg && 'Owner'}</li>
          </NavLink>
        ) : (
          <NavLink
            to='/cart'
            className={({ isActive }) =>
              isActive ? 'nb-link--active' : 'nb-link'
            }
          >
            <li className="nb-li">Cart</li>
          </NavLink>
        )}
        <NavLink
          to={(isAuthenticated && '/saccount') || (clg && '/oprofile')}
          className={({ isActive }) =>
            isActive ? 'nb-link--active' : 'nb-link'
          }
        >
          <li className="nb-li">{clg || isAuthenticated ? 'Profile' : ''}</li>
        </NavLink>
        <span>|</span>
        {isAuthenticated || clg ? (
          <>
            {isAuthenticated && (
              <button className="nb-lb" onClick={logoutStudentFunction}>
                Logout
              </button>
            )}
            {clg && (
              <Form method="POST" action="/logout">
                <button className="nb-lb">Logout</button>
              </Form>
            )}
          </>
        ) : (
          <NavLink to="/slogin">
            <button className="nb-lb">Login</button>
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default DesktopNavbar;
