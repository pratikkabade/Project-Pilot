import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PageName from "../functions/PageName"
import { GetItem, SetItem } from "../functions/ArrayData"
import UserDataInterface from "../interfaces/UserDataInterface"
import LogoSVG from "../assets/logo/LogoSVG"

export const Login = () => {
     const [id, setId] = useState(GetItem('remembered_id'))
     const [allUsers, setAllUsers] = useState<UserDataInterface[]>([])
     const [password, setPassword] = useState('')
     const [userNotFoundError, setUserNotFoundError] = useState(false)
     const [passwordError, setPasswordError] = useState(false)
     const [rememberId, setRememberId] = useState(false)

     let navigate = useNavigate();

     useEffect(() => {
          PageName('Login')
          setAllUsers(GetItem('all_user'))
     }, [])

     const save_login = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          if (!allUsers.some((user: UserDataInterface) => user.id === id)) {
               setUserNotFoundError(true);
               document.getElementById('id')?.focus();
               document.getElementById('id_wrong')?.focus();
          } else {
               loginFunction(id, password)
          }
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
          navigate('/home');
     };

     return (
          <div className="flex justify-center font-sans">
               <div className="flex p-10 my-28 justify-between items-center bg-base-100 rounded-3xl w-3/4 max-sm:w-full flex-row max-md:flex-col h-fit">
                    <div className="branding font-bold">
                         <LogoSVG size={80} />
                         <h1 className="text-5xl max-lg:text-4xl max-sm:text-3xl mt-5">Log in</h1>
                         <h1 className="text-xl font-normal mt-2">Use your work account</h1>
                    </div>
                    <form className="flex flex-col justify-end w-2/4">
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
                         {userNotFoundError ?
                              <p className="text-red-700 font-semibold">User not found</p> :
                              passwordError ?
                                   <p className="text-red-700 font-semibold">Password is incorrect</p> :
                                   <p className="text-base-100">No Error</p>}
                         <div className="mt-6 flex flex-col items-end">
                              <label className="label cursor-pointer">
                                   <span className="label-text mr-5">Remember me</span>
                                   <input
                                        type="checkbox"
                                        className="checkbox"
                                        onClick={() => setRememberId(!rememberId)} />
                              </label>
                         </div>
                         <button className="btn btn-primary"
                              onClick={(e) => save_login(e)}>
                              Login
                         </button>
                    </form>
               </div>
          </div >
     )
}