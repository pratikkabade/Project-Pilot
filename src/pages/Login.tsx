import { Button, Card } from "flowbite-react"
import { ALL_Items } from "../routes/AppRoute"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import PageName from "../functions/PageName"

export const Login = () => {
     useEffect(() => {
          PageName('Login')
     }, [])
     
     return (
          <div className="flex flex-row justify-center">
               <Card className="flex flex-row flex-wrap">
                    {
                         ALL_Items.map((item, index) => {
                              return (
                                   <Link to={item.link} key={index}>
                                        <Button>
                                             {item.name}
                                        </Button>
                                   </Link>
                              )
                         })
                    }
               </Card>
          </div>
     )
}