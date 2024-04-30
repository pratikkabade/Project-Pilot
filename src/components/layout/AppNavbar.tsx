import { Link } from "react-router-dom";
import { ThemeToggler } from "../ThemeToggler";
import LogoSVG from "../../assets/logo/LogoSVG";

export function AppNavbar() {
     return (
          <div className="navbar fixed z-50 shadow-xl backdrop-blur-sm bg-base-100 rounded-b-3xl px-4 pr-6">
               <div className="flex-1">
                    <Link to={'/home'} className="flex flex-row">
                         <a className="btn btn-ghost text-xl">
                              <LogoSVG size={30} />
                              Project-Pilot
                         </a>
                    </Link>
               </div>
               <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 items-center mr-2">
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
