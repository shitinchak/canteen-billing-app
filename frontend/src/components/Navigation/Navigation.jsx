import {Outlet} from 'react-router-dom';
import MobileNavigation from './MobileNavigation';
import DesktopNavbar from './DesktopNavbar';

const Navigation = () => {

  return(
    <>
    <DesktopNavbar />
    <main>
      <Outlet/>
    </main>
    <MobileNavigation />
  </>
  )
};

export default Navigation;
