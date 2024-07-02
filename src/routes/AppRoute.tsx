
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { AppNavbar } from "../components/layout/AppNavbar"
import { PM } from "../pages/PM"
import { FM } from "../pages/FM"
import { SM } from "../pages/SM"
import { Employee } from "../pages/Employee"
import { DataRefresh } from "../pages/DataRefresh"
import { Button } from "flowbite-react"

export const Route_Items = [
    { name: "Login", link: "/", element: <Login /> },
    { name: "PM", link: "/PM", element: <PM /> },
    { name: "FM", link: "/FM", element: <FM /> },
    { name: "SM", link: "/SM", element: <SM /> },
    { name: "Employee", link: "/Employee", element: <Employee /> },
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
                <Link to='/'><Button color={'red'}>back</Button></Link>
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

            </BrowserRouter>
        </div>
    )
}
