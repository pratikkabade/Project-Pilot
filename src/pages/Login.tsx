import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PageName from "../functions/PageName"
import { GetItem, SetItem } from "../functions/ArrayData"
import UserDataInterface from "../interfaces/UserDataInterface"

export const Login = () => {
     const [id, setId] = useState('')
     const [allUsers, setAllUsers] = useState<UserDataInterface[]>([])
     const [password, setPassword] = useState('')
     const [error, setError] = useState('')

     let navigate = useNavigate();

     useEffect(() => {
          PageName('Login')
          setAllUsers(GetItem('all_user'))
     }, [])

     const save_login = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          if (!allUsers.some((user: UserDataInterface) => user.id === id)) {
               setError('User not found')
          } else {
               loginFunction(id, password)
          }
     }

     const check_password = (id: string, password: string): boolean => {
          return allUsers.some(user => user.id === id && user.password === password);
     };

     const loginFunction = (id: string, password: string) => {
          if (!check_password(id, password)) {
               setError('Password is incorrect')
               return;
          }
          SetItem('login_details', id);
          navigate('/home');
     };

     return (
          <div className="flex flex-row justify-center bg-base-200">
               <div className="hero min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                         <div className="text-center lg:text-left">
                              <h1 className="text-5xl font-bold text-nowrap">Welcome back!</h1>
                              <p className="py-6">
                                   Ready to Pilot your next Project?
                              </p>
                         </div>
                         <div className="rounded-xl bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                              <form className="card-body">
                                   <h2 className="text-2xl font-bold text-center">Login</h2>
                                   {error &&
                                        <div role="alert" className="alert alert-warning">
                                             <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  className="h-6 w-6 shrink-0 stroke-current"
                                                  fill="none"
                                                  viewBox="0 0 24 24">
                                                  <path
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                       strokeWidth="2"
                                                       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                             </svg>
                                             <span>{error}</span>
                                        </div>
                                   }
                                   <div className="form-control">
                                        <input
                                             type="text"
                                             placeholder="ID"
                                             className="input input-bordered"
                                             onChange={(e) => {
                                                  e.target.value = e.target.value.toLowerCase()
                                                  setId(e.target.value)
                                             }}
                                             required />
                                   </div>
                                   <div className="form-control mt-6">
                                        <input
                                             type="password"
                                             placeholder="Password"
                                             className="input input-bordered"
                                             onChange={(e) => setPassword(e.target.value)}
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