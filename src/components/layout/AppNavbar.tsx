import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export function AppNavbar() {
     return (
          <Navbar fluid rounded className="shadow-sm bg-slate-50 dark:bg-slate-900">
               <Link to={'/home'}>
                    <Navbar.Brand className="hover:text-cyan-700 cursor-pointer">
                         <img src="src/assets/images/image.png" className="mr-3 h-6 sm:h-9 rounded-lg" alt="Logo" />
                         <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                         Project-Pilot
                         </span>
                    </Navbar.Brand>
               </Link>
               <Navbar.Toggle />
               <Navbar.Collapse>
                    <Link to={'/DataRefresh'}>
                         <Navbar.Link>Data Refresh</Navbar.Link>
                    </Link>
                    <Link to={'/Login'}>
                         <Navbar.Link>Login</Navbar.Link>
                    </Link>
               </Navbar.Collapse>
          </Navbar>
     );
}
