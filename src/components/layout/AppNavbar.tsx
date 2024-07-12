import { Link } from "react-router-dom";
import { ThemeToggler } from "../ThemeToggler";
import LogoSVG from "../../assets/logo/LogoSVG";
import { useEffect, useReducer, useState } from "react";
import { GetItem, SetItem } from "../../functions/ArrayData";
import PageName from "../../functions/PageName";

export const AppNavbar = () => {
     const [id, setId] = useState(GetItem('login_details'));

     const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

     useEffect(() => {
          PageName('Project-Pilot')
          console.log(`ID has changed to: ${id}`);
          forceUpdate();
     }, [id, ignored]);

     return (
          <div className="navbar fixed z-50 shadow-xl backdrop-blur-sm bg-base-100 rounded-b-3xl px-4 pr-6">
               <div className="flex-1">
                    <a className="btn btn-ghost text-xl hover:text-blue-600 hover:bg-base-100">
                         <Link to={'/dashboard'} className="flex flex-row">
                              <LogoSVG size={30} />
                         </Link>
                         <Link to={'/home'} className="flex flex-row">
                              Project-Pilot
                         </Link>
                    </a>
               </div>
               <div className="flex-none">
                    <ul className="px-1 items-center mr-2 font-bold">
                         <li className="px-3">
                              {
                                   id === '' ? (
                                        <Link to={'/Login'}
                                             className="hover:text-blue-600 hover:bg-base-100">
                                             Login
                                        </Link>
                                   ) : (
                                        <Link to={'/Login'}
                                             onClick={() => {
                                                  SetItem('login_details', '')
                                                  setId('')
                                             }}
                                             className="hover:text-red-600 hover:bg-base-100">
                                             Sign Out
                                        </Link>
                                   )
                              }
                         </li>
                    </ul>
                    <ThemeToggler />
               </div>
          </div>

     );
}
