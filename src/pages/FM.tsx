import { Button, Card, Select, TextInput } from "flowbite-react";
import FinanceInterface from "../interfaces/FinanceInterface";
import { useEffect, useState } from "react";
import ProjectInterface from "../interfaces/ProjectInterface";
import StatusOptions from "../interfaces/StatusOptions";
import PageName from "../functions/PageName";
import { GetItem, SetItem } from "../functions/ArrayData";

export const FM = () => {
     const [finances, setFinances] = useState<FinanceInterface[]>([]);
     const [projects, setProjects] = useState<ProjectInterface[]>([]);
     useEffect(() => {
          const finances = GetItem('finances');
          setFinances(finances);
          const projects = GetItem('projects');
          setProjects(projects);
          PageName('FM');
     }, []);

     const [newProjectID, setnewProjectID] = useState('');
     const [newAmount, setnewAmount] = useState(0);
     const [newOtherExpense, setnewOtherExpense] = useState('');
     const [newDate, setnewDate] = useState('');
     const [newDescription, setnewDescription] = useState('');
     const [newCategory, setnewCategory] = useState('');
     const [newStatus, setnewStatus] = useState('');
     const [newOtherExpenseAmount, setnewOtherExpenseAmount] = useState(0);

     const expenseChange = () => {
          // copy existing finances
          const financesCopy = [...finances];
          const financeIndex = financesCopy.findIndex((finance) => finance.project_id === newProjectID);
          if (financeIndex === -1) {
               financesCopy.push({
                    project_id: newProjectID,
                    amount: newAmount,
                    other_expenses: []
               });
          } else {
               financesCopy[financeIndex].amount = newAmount;
          }
          setnewAmount(0);
          setFinances(financesCopy);
          SetItem('finances', financesCopy);
     };

     const addOtherExpense = () => {
          finances.map((finance) => console.log(finance.project_id));

          const financeIndex = finances.findIndex((finance) => finance.project_id === newProjectID);
          if (financeIndex === -1) {
               return;
          }

          const finance = finances[financeIndex];
          finance.other_expenses.push({
               other_expenses_name: newOtherExpense,
               other_expenses_date: newDate,
               other_expenses_description: newDescription,
               other_expenses_category: newCategory,
               other_expenses_status: newStatus,
               other_expenses_amount: newOtherExpenseAmount
          });

          setFinances([...finances]);
          SetItem('finances', finances);
     }

     return (
          <div className="p-5">
               <h1 className='text-5xl font-bold'>Welcome back, FM</h1>
               <h2 className=' mt-10 text-2xl font-semibold'>Quick insight</h2>
               <div className="flex flex-row flex-wrap">
                    {finances.map((finance: FinanceInterface) => (
                         <Card key={finance.project_id} className="m-5">
                              <h3 className='text-2xl font-semibold'>
                                   {
                                        projects.find(project => project.project_id === finance.project_id)?.name
                                   }
                              </h3>
                              <h3 className='text-xl font-normal'>
                                   Funds available
                                   <span className='font-bold ml-2'>{finance.amount}</span>
                              </h3>
                              <h3 className='text-xl font-normal'>
                                   Funds utilized
                                   <span className='font-bold ml-2'>
                                        {
                                             finance.other_expenses.reduce((acc, other_expense) => acc + other_expense.other_expenses_amount, 0)
                                        }
                                   </span>
                              </h3>
                              <div className="flex flex-row flex-wrap">
                                   {finance.other_expenses.map((other_expense, index) => (
                                        <Card className="m-3" key={index}>
                                             <h3 className='text-lg font-normal'>
                                                  Funds available
                                                  <span className='font-bold ml-2'>{other_expense.other_expenses_name}</span>
                                             </h3>
                                             <h3 className='text-lg font-normal'>
                                                  Date
                                                  <span className='font-bold ml-2'>{other_expense.other_expenses_date}</span>
                                             </h3>
                                             <h3 className='text-lg font-normal'>
                                                  Description:
                                                  <span className='font-bold ml-2'>{other_expense.other_expenses_description}</span>
                                             </h3>
                                             <h3 className='text-lg font-normal'>
                                                  Category
                                                  <span className='font-bold ml-2'>{other_expense.other_expenses_category}</span>
                                             </h3>
                                             <h3 className='text-lg font-normal'>
                                                  Payment Status
                                                  <span className='font-bold ml-2'>{other_expense.other_expenses_status}</span>
                                             </h3>
                                             <h3 className='text-lg font-normal'>
                                                  Funds used
                                                  <span className='font-bold ml-2'>{other_expense.other_expenses_amount}</span>
                                             </h3>
                                        </Card>
                                   ))}
                              </div>
                         </Card>
                    ))}
               </div>


               <h2 className=' mt-10 text-2xl font-semibold'>Add-Manage</h2>

               <div className="flex flow-row">
                    <Card className="m-5">
                         <Select value={newProjectID} onChange={(e) => setnewProjectID(e.target.value)}>
                              <option value="">Select Project</option>
                              {projects.map((project: ProjectInterface, index) => (
                                   <option key={index} value={project.project_id}>{project.name}</option>
                              ))}
                         </Select>
                         <TextInput
                              type="number"
                              value={newAmount}
                              placeholder="Total Amount"
                              onChange={(e) => setnewAmount(Number(e.target.value))}
                         />
                         <Button
                              onClick={expenseChange}
                              disabled={!newProjectID}>
                              Add
                         </Button>
                    </Card>

                    <Card className="m-5">
                         <TextInput
                              type="text"
                              placeholder="Other Expense"
                              onChange={(e) => setnewOtherExpense(e.target.value)}
                         />
                         <div className="flex flex-row">
                              <TextInput
                                   type="date"
                                   placeholder="Date"
                                   onChange={(e) => setnewDate(e.target.value)}
                                   value={newDate}
                                   className="w-full"
                              />
                              <Button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-fit h-full ml-2"
                                   onClick={() => {
                                        setnewDate(new Date().toISOString().split('T')[0])
                                   }}
                              >
                                   Today
                              </Button>
                         </div>

                         <TextInput
                              type="text"
                              placeholder="Description"
                              onChange={(e) => setnewDescription(e.target.value)}
                         />
                         <TextInput
                              type="text"
                              placeholder="Category"
                              onChange={(e) => setnewCategory(e.target.value)}
                         />
                         <Select value={newStatus} onChange={(e) => setnewStatus(e.target.value)}>
                              <option value="">Select Status</option>
                              {
                                   StatusOptions.map((status: string, index) => (
                                        <option key={index} value={status}>{status}</option>
                                   ))
                              }
                         </Select>
                         <TextInput
                              type="number"
                              placeholder="Other Expense Amount"
                              onChange={(e) => setnewOtherExpenseAmount(Number(e.target.value))}
                         />

                         <Button
                              onClick={addOtherExpense}
                              disabled={!newProjectID}
                         >
                              Add Other Expense
                         </Button>
                    </Card>
               </div>
          </div >
     );
};