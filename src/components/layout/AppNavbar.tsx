import { Link } from "react-router-dom";
import { ThemeToggler } from "../ThemeToggler";

export function AppNavbar() {
     return (
          <div className="navbar bg-base-100 rounded-b-3xl px-4 pr-6">
               <div className="flex-1">
                    <Link to={'/home'}>
                         <a className="btn btn-ghost text-xl">
                              Project-Pilot
                         </a>
                    </Link>
               </div>
               <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 items-center mr-2">
                         <li>
                              <Link to={'/DataRefresh'}>
                                   Data Refresh
                              </Link>
                         </li>
                         <li>
                              <Link to={'/Login'}>
                                   Login
                              </Link>
                         </li>
                    </ul>
                    <ThemeToggler />
               </div>
          </div>

     );
}
