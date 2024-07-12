
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { AppNavbar } from "../components/layout/AppNavbar"
import { PM } from "../pages/PM"
import { FM } from "../pages/FM"
import { SM } from "../pages/SM"
import { Employee } from "../pages/Employee"
import { DataRefresh } from "../pages/DataRefresh"
import { Lander } from "../pages/Lander"
import { AppFooter } from "../components/layout/AppFooter"
import { Dashboard } from "../pages/Dashboard"

export const Route_Items = [
    { name: "Login", link: "/", element: <Lander /> },
    { name: "Login", link: "/home", element: <Lander /> },
    { name: "Login", link: "/dashboard", element: <Dashboard /> },
    { name: "Login", link: "/login", element: <Login /> },
    { name: "PM", link: "/PM", element: <PM /> },
    { name: "FM", link: "/FM", element: <FM /> },
    { name: "SM", link: "/SM", element: <SM /> },
    { name: "Employee", link: "/Employee", element: <Employee /> },
    { name: "Employee", link: "/e/*", element: <Employee /> },
    { name: "DataRefresh", link: "/DataRefresh", element: <DataRefresh /> },
]

export const ALL_Items = [
    { name: "Employee", link: "/Employee" },
    { name: "FM", link: "/FM" },
    { name: "PM", link: "/PM" },
    { name: "SM", link: "/SM" },
    { name: "DataRefresh", link: "/DataRefresh" },
]

export const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <AppNavbar />
                <Routes>
                    {
                        Route_Items.map((item, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={item.link}
                                    element={item.element} />
                            )
                        })
                    }
                </Routes>
<AppFooter />
            </BrowserRouter>
        </div>
    )
}
