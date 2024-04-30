import { useEffect, useState } from "react"
import { GetItem } from "../functions/ArrayData"
import { Link } from "react-router-dom"
import PageName from "../functions/PageName"

export const NavigationButton = () => {
    const [id, setId] = useState('')
    useEffect(() => {
        setId(GetItem('login_details'))
        PageName('Project-Pilot')
    }, [])

    return (
        <>
            {
                id === '' ?
                    <Link to={'/login'}>
                        <button className="btn btn-animated-2">
                            Log in
                        </button>
                    </Link>
                    :
                    <Link to={'/' + id}>
                        <button className="btn btn-animated-2">
                            Get Started
                        </button>
                    </Link>
            }
        </>
    )
}