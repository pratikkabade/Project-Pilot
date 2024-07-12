import { useEffect, useState } from "react";
import PageName from "../functions/PageName";
import { Lander } from "./Lander"
import { GetItem } from "../functions/ArrayData";
import { PM } from "./PM";
import { SM } from "./SM";
import { FM } from "./FM";
import { Employee } from "./Employee";

export const Dashboard = () => {
     const [id, setId] = useState(GetItem('login_details'));
     useEffect(() => {
          PageName('Project-Pilot')
          console.log(`ID has changed to: ${id}`);
     }, [id]);

     return (
          <div>
               {
                    id === '' ?
                         <Lander />
                         :
                         id === 'pm' ?
                              <PM />
                              :
                              id === 'sm' ?
                                   <SM />
                                   :
                                   id === 'fm' ?
                                        <FM />
                                        :
                                        <Employee />
               }
          </div>
     )
}