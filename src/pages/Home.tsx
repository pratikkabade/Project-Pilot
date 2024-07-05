import { useEffect, useState } from "react"
import { GetItem } from "../functions/ArrayData"
import { Link } from "react-router-dom"
import PageName from "../functions/PageName"

export const HomePage = () => {
    const [id, setId] = useState('')
    useEffect(() => {
        setId(GetItem('login_details'))
        PageName('Project-Pilot')
    }, [])
    console.log(id)
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                    className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Project-Pilot</h1>
                    <p className="py-6">
                        Navigate your Project to Success with Project-Pilot
                    </p>
                    {
                        id === '' ?
                            <Link to={'/login'}>
                                <button className="btn btn-primary">
                                    Log in
                                </button>
                            </Link>
                            : 
                            <Link to={'/' + id}>
                                <button className="btn btn-primary">
                                    Get Started
                                </button>
                            </Link>
                    }
                </div>
            </div>
        </div>
    )
}