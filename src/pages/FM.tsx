import FinanceInterface from "../interfaces/FinanceInterface";
import { useEffect, useReducer, useState } from "react";
import ProjectInterface from "../interfaces/ProjectInterface";
import StatusOptions from "../interfaces/StatusOptions";
import PageName from "../functions/PageName";
import { GetItem, SetItem } from "../functions/ArrayData";
import FinanceRange from "../components/fm/FinanceRange";
import { FundingStatus } from "../components/fm/FundingStatus";
import { FMTable } from "../components/fm/FMTable";

export const FM = () => {
     const [finances, setFinances] = useState<FinanceInterface[]>([]);
     const [projects, setProjects] = useState<ProjectInterface[]>([]);

     const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

     useEffect(() => {
          const finances = GetItem('finances');
          setFinances(finances);
          const projects = GetItem('projects');
          setProjects(projects);
          PageName('FM');
          forceUpdate();
     }, [ignored]);

     const [newProjectID, setnewProjectID] = useState('');
     const [newOtherExpense, setnewOtherExpense] = useState('');
     const [newDate, setnewDate] = useState('');
     const [newDescription, setnewDescription] = useState('');
     const [newCategory, setnewCategory] = useState('');
     const [newStatus, setnewStatus] = useState('');
     const [newOtherExpenseAmount, setnewOtherExpenseAmount] = useState(0);

     const addOtherExpense = () => {
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

     const totalExpenses = finances.reduce((acc: number, finance: any) => acc + finance.amount, 0)

     return (
          <div className="p-5">
               <h1 className='text-5xl font-bold'>Welcome back, FM</h1>
               <h2 className=' mt-10 text-2xl font-semibold'>Quick insight</h2>
               <div className="flex flex-row flex-wrap">
                    {finances.map((finance: FinanceInterface) => (
                         <div key={finance.project_id} className="card">
                              <h3 className='text-2xl font-bold'>
                                   {
                                        projects.find(project => project.project_id === finance.project_id)?.name
                                   }
                              </h3>
                              <FundingStatus item={finance} />
                              <h3 className='text-xl'>
                                   Other Expenses:
                                   <b className="ml-2 px-2 py-1 bg-base-300 rounded-lg">{finance.other_expenses.length}</b>
                              </h3>
                         </div>
                    ))}
               </div>

               <FMTable />


               <h2 className=' mt-10 text-2xl font-semibold'>Add-Manage</h2>
               <div className="flex flow-row flex-wrap">
                    <div className="card">
                         <select
                              className="select select-bordered w-full "
                              value={newProjectID} onChange={(e) => setnewProjectID(e.target.value)}>
                              <option value="">Select Project</option>
                              {projects.map((project: ProjectInterface, index) => (
                                   <option key={index} value={project.project_id}>{project.name}</option>
                              ))}
                         </select>
                         <input
                              className="input input-bordered"
                              type="text"
                              placeholder="Other Expense"
                              onChange={(e) => setnewOtherExpense(e.target.value)}
                         />
                         <div className="flex flex-row">
                              <input
                                   className="input input-bordered w-full mr-4"
                                   type="date"
                                   placeholder="Date"
                                   onChange={(e) => setnewDate(e.target.value)}
                                   value={newDate}
                              />
                              <button
                                   type="button" className="btn btn-primary"
                                   onClick={() => {
                                        setnewDate(new Date().toISOString().split('T')[0])
                                   }}
                              >
                                   Today
                              </button>
                         </div>

                         <input
                              className="input input-bordered"
                              type="text"
                              placeholder="Description"
                              onChange={(e) => setnewDescription(e.target.value)}
                         />
                         <input
                              className="input input-bordered"
                              type="text"
                              placeholder="Category"
                              onChange={(e) => setnewCategory(e.target.value)}
                         />
                         <select
                              className="select select-bordered w-full "
                              value={newStatus} onChange={(e) => setnewStatus(e.target.value)}>
                              <option value="">Select Status</option>
                              {
                                   StatusOptions.map((status: string, index) => (
                                        <option key={index} value={status}>{status}</option>
                                   ))
                              }
                         </select>
                         <input
                              className="input input-bordered"
                              type="number"
                              value={newOtherExpenseAmount}
                              placeholder="Other Expense Amount"
                              onChange={(e) => setnewOtherExpenseAmount(Number(e.target.value))}
                         />
                         <div className="flex flex-row justify-around">
                              <button
                                   className="btn btn-outline btn-primary rounded-full w-20 h-0"
                                   onClick={() => setnewOtherExpenseAmount(newOtherExpenseAmount + 100)}
                              >
                                   + 100
                              </button>
                              <button
                                   className="btn btn-outline btn-primary rounded-full w-20 h-0"
                                   onClick={() => setnewOtherExpenseAmount(newOtherExpenseAmount + 500)}
                              >
                                   + 500
                              </button>
                              <button
                                   className="btn btn-outline btn-primary rounded-full w-20 h-0"
                                   onClick={() => setnewOtherExpenseAmount(newOtherExpenseAmount + 1000)}
                              >
                                   + 1000
                              </button>
                         </div>

                         <button
                              className="btn btn-primary"
                              onClick={addOtherExpense}
                              disabled={!newProjectID}
                         >
                              Add Other Expense
                         </button>
                    </div>

                    <div className="card">
                         {
                              projects.map((_: ProjectInterface, index) => (
                                   <div key={index} className="flex flex-col">
                                        {index === 0 && (
                                             <FinanceRange
                                                  projects={projects}
                                                  finances={finances}
                                                  totalExpenses={Math.floor(totalExpenses)}
                                             />
                                        )}
                                   </div>
                              ))
                         }
                    </div>
               </div>
          </div >
     );
};