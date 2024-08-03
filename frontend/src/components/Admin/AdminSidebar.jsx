import "../../components/Navigation/Sidebar.css";
// import {MenuSquare, ShoppingCart, BookOpen, User2, Settings, LogOut} from "lucide-react"
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <div className="ssb-main">
        <ul className="ssb-ul">
          <Link to="/dashboard">
            <li className="ssb-li">Dashboards</li>
          </Link>
          <Link to="/ownerlist">
            <li className="ssb-li">Owners</li>
          </Link>
          <Link to="/studentlist">
            <li className="ssb-li"> Students</li>
          </Link>
          <Link to="/orderlist">
            <li className="ssb-li">Orders</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;
