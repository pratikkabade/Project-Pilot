import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PageName from "../functions/PageName"
import { GetItem, SetItem } from "../functions/ArrayData"
import UserDataInterface from "../interfaces/UserDataInterface"

export const Login = () => {
     const [id, setId] = useState('')
     const [allUsers, setAllUsers] = useState<UserDataInterface[]>([])

     let navigate = useNavigate();

     useEffect(() => {
          PageName('Login')
          setAllUsers(GetItem('all_user'))
     }, [])

     const save_login = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          if (!allUsers.some((user: UserDataInterface) => user.id === id)) {
               alert('ID not found')
          } else {
               SetItem('login_details', id)
               navigate('/home')
          }
     }

     return (
          <div className="flex flex-row justify-center">
               <div className="hero min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                         <div className="text-center lg:text-left">
                              <h1 className="text-5xl font-bold text-nowrap">Welcome back!</h1>
                              <p className="py-6">
                                   Ready to Pilot your next Project!
                              </p>
                         </div>
                         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                              <form className="card-body">
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">ID</span>
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="ID"
                                             className="input input-bordered"
                                             onChange={(e) => { setId(e.target.value) }}
                                             required />
                                   </div>
                                   <div className="form-control mt-6">
                                        <button className="btn btn-primary"
                                             onClick={(e) => save_login(e)}>
                                             Login
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     )
}