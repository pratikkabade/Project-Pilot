import { Button, Card, Select, TextInput } from "flowbite-react";
import FinanceInterface from "../interfaces/FinanceInterface";
import { useEffect, useState } from "react";
import ProjectInterface from "../interfaces/ProjectInterface";

export const FM = () => {
     const [finances, setFinances] = useState<FinanceInterface[]>([]);
     const [projects, setProjects] = useState<ProjectInterface[]>([]);
     useEffect(() => {
          const finances = JSON.parse(localStorage.getItem('finances') || '[]');
          setFinances(finances);
          const projects = JSON.parse(localStorage.getItem('projects') || '[]');
          setProjects(projects);
     }, []);

     const [newProjectID, setnewProjectID] = useState('');
     const [newAmount, setnewAmount] = useState(0);

     const addFinance = () => {
          // copy existing finances
          const financesCopy = [...finances];
          const financeIndex = financesCopy.findIndex((finance) => finance.project_id === newProjectID);
          if (financeIndex === -1) {
               financesCopy.push({
                    project_id: newProjectID,
                    amount: newAmount
               });
          } else {
               financesCopy[financeIndex].amount = newAmount;
          }
          setnewAmount(0);          
          setFinances(financesCopy);
          localStorage.setItem('finances', JSON.stringify(finances));
     };

     return (
          <div>
               <h1>FM</h1>
               <ul>
                    {finances.map((finance: FinanceInterface) => (
                         <li key={finance.project_id}>
                              {finance.amount}
                         </li>
                    ))}
               </ul>
               <Card>
                    <Select value={newProjectID} onChange={(e) => setnewProjectID(e.target.value)}>
                         <option value="">Select Project</option>
                         {projects.map((project: ProjectInterface) => (
                              <option value={project.project_id}>{project.name}</option>
                         ))}
                    </Select>
                    <TextInput
                         type="number"
                         placeholder="Amount"
                         value={newAmount}
                         onChange={(e) => setnewAmount(Number(e.target.value))}
                    />
                    <Button onClick={addFinance}>
                         Add Finance
                    </Button>
               </Card>
          </div>
     );
};