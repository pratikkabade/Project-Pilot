import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PageName from "../functions/PageName"
import { GetItem, SetItem } from "../functions/ArrayData"
import UserDataInterface from "../interfaces/UserDataInterface"
import LogoSVG from "../assets/logo/LogoSVG"
import { ProfilePicture } from "../assets/images/ProfilePicture"

export const Login = () => {
     const [showLogin, setShowLogin] = useState(true)
     const [id, setId] = useState(GetItem('remembered_id'))
     const [allUsers, setAllUsers] = useState<UserDataInterface[]>([])
     const [password, setPassword] = useState('')
     const [userNotFoundError, setUserNotFoundError] = useState(false)
     const [passwordError, setPasswordError] = useState(false)
     const [rememberId, setRememberId] = useState(false)

     const [animations, setAnimations] = useState(false)
     function startAnimations() {
          setAnimations(true);
          setTimeout(() => {
               setAnimations(false)
          }, 1500);
     }

     let navigate = useNavigate();

     useEffect(() => {
          PageName('Login')
          setAllUsers(GetItem('all_user'))
     }, [])

     const next_login = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          startAnimations();
          setTimeout(() => {
               if (!allUsers.some((user: UserDataInterface) => user.id === id)) {
                    setUserNotFoundError(true);
                    document.getElementById('id')?.focus();
                    document.getElementById('id_wrong')?.focus();
               } else {
                    setShowLogin(false);
                    setTimeout(() => {
                         document.getElementById('password')?.focus();
                    }, 100);
               }
          }, 1500);
     }

     const save_login = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          startAnimations();
          setTimeout(() => {
               loginFunction(id, password)
          }, 1500);
     }

     const check_password = (id: string, password: string): boolean => {
          return allUsers.some(user => user.id === id && user.password === password);
     };

     const loginFunction = (id: string, password: string) => {
          if (!check_password(id, password)) {
               setPasswordError(true);
               document.getElementById('password')?.focus();
               document.getElementById('password_wrong')?.focus();
               return;
          }
          rememberId && SetItem('remembered_id', id);
          SetItem('login_details', id);
          navigate('/dashboard');
     };

     return (
          <div className="h-screen flex justify-center items-center font-sans">
               <div className={`flex p-10 justify-between items-center ${animations ? 'skeleton' : 'bg-base-100'} rounded-3xl w-3/4 max-lg:w-full flex-row max-md:flex-col h-fit`}>
                    <div className="branding font-bold flex flex-col items-end max-md:flex-row max-md:items-center max-md:w-full">
                         <LogoSVG size={80} />
                         {showLogin ?
                              <div className="max-md:ml-5 md:text-right">
                                   <h1 className="text-5xl max-md:text-3xl mt-5 max-md:mt-0 p-1">Log in</h1>
                                   <h1 className="text-2xl max-md:text-xl font-normal mt-2 w-64 p-1">Use your work account</h1>
                              </div>
                              :
                              <div className="max-md:ml-5 md:text-right">
                                   <h1 className="text-5xl max-md:text-3xl mt-5 max-md:mt-0 p-1">Welcome</h1>
                                   <h1 className="text-2xl max-md:text-xl font-normal mt-2 w-64 p-1 pr-3 rounded-full  hover:bg-base-200 border-2 border-base-200 cursor-pointer"
                                        onClick={() => {
                                             startAnimations();
                                             setTimeout(() => {
                                                  setShowLogin(true);
                                             }, 1500);
                                        }}>
                                        <span className="flex flex-row justify-between items-center">
                                             <ProfilePicture />
                                             {id}
                                        </span>
                                   </h1>
                              </div>}
                    </div>
                    {showLogin &&
                         <form className="flex flex-col justify-end w-2/4 max-md:mt-20 max-md:w-full">
                              {!userNotFoundError ?
                                   <input
                                        type="text"
                                        placeholder="ID"
                                        id="id"
                                        className="input input-bordered my-2"
                                        onChange={(e) => {
                                             e.target.value = e.target.value.toLowerCase()
                                             setId(e.target.value)
                                        }}
                                        value={id}
                                        required /> :
                                   <input
                                        type="text"
                                        placeholder="ID"
                                        id="id_wrong"
                                        className="input input-bordered input-error my-2"
                                        onChange={() => setUserNotFoundError(false)}
                                        required />}

                              {userNotFoundError ?
                                   <p className="text-red-700 font-semibold">User not found</p> :
                                   <p className="opacity-0">No Error</p>}

                              <div className="opacity-0 mt-6 flex flex-col items-end">
                                   <label className="label cursor-pointer">
                                        <span className="label-text mr-5">BLANK</span>
                                   </label>
                              </div>
                              <div className="flex flex-row justify-between">
                                   <p className="btn btn-outline btn-primary rounded-full">
                                        Create Account
                                   </p>

                                   <button className="btn btn-primary rounded-full"
                                        onClick={(e) => next_login(e)}>
                                        Next
                                   </button>
                              </div>
                         </form>}

                    {!showLogin &&
                         <form className="flex flex-col justify-end w-2/4 max-md:mt-20 max-md:w-full">
                              {!passwordError ?
                                   <input
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        className="input input-bordered my-2"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required /> :
                                   <input
                                        type="password"
                                        placeholder="Password"
                                        id="password_wrong"
                                        className="input input-bordered input-error my-2"
                                        onChange={() => setPasswordError(false)}
                                        required />}
                              {passwordError ?
                                   <p className="text-red-700 font-semibold">Password is incorrect</p> :
                                   <p className="opacity-0">No Error</p>}
                              <div className="mt-6 flex flex-col items-end">
                                   <label className="label cursor-pointer">
                                        <span className="label-text mr-5">Remember me</span>
                                        <input
                                             type="checkbox"
                                             className="checkbox"
                                             onClick={() => setRememberId(!rememberId)} />
                                   </label>
                              </div>
                              <div className="flex flex-row justify-between">
                                   <p className="btn btn-outline btn-primary rounded-full">
                                        Create Account
                                   </p>

                                   <button className="btn btn-primary rounded-full"
                                        onClick={(e) => save_login(e)}>
                                        Login
                                   </button>
                              </div>
                         </form>}
               </div>
          </div >
     )
}