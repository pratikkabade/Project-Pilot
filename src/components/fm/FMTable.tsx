import { useEffect, useState } from "react";
import ProjectInterface from "../../interfaces/ProjectInterface";
import FinanceInterface from "../../interfaces/FinanceInterface"; // Update FinanceInterface
import StatusOptions from "../../interfaces/StatusOptions";
import PageName from "../../functions/PageName";
import { GetItem, SetItem } from "../../functions/ArrayData";

export const FMTable = () => {
     const [projects, setProjects] = useState<ProjectInterface[]>([]);
     const [finances, setFinances] = useState<FinanceInterface[]>([]); // Update FinanceInterface
     const [showFilters, setShowFilters] = useState(false);
     const [filteredProject, setFilteredProject] = useState<string>('');
     const [filteredTitle, setFilteredTitle] = useState<string>('');
     const [filteredDate, setFilteredDate] = useState<string>('');
     const [filteredDescription, setFilteredDescription] = useState<string>('');
     const [filteredCategory, setFilteredCategory] = useState<string>('');
     const [filteredStatus, setFilteredStatus] = useState<string>('');
     const [filteredAmount, setFilteredAmount] = useState<string>('');

     const getFinances = () => {
          const allFinances: FinanceInterface[] = GetItem('finances'); // Assuming 'finances' is your JSON data
          setFinances(allFinances);
          const projects: ProjectInterface[] = GetItem('projects');
          setProjects(projects);
          PageName('FM');
     };

     useEffect(() => {
          getFinances();
     }, []);

     const updateFinanceData = (finance_id: string, expense_index: number, key: keyof typeof finances[0]['other_expenses'][0], value: any) => {
          const allFinances: FinanceInterface[] = [...finances]; // Copy the array
          const financeIndex = allFinances.findIndex(finance => finance.project_id === finance_id);
          if (financeIndex === -1) return;

          const expenseToUpdate = allFinances[financeIndex].other_expenses[expense_index];

          // Check if key exists in expenseToUpdate before assignment
          if (key in expenseToUpdate) {
               // Type assertion to help TypeScript understand the types correctly
               (expenseToUpdate as { [k in typeof key]: any })[key] = value;
               setFinances(allFinances);
               SetItem('finances', allFinances);
          }
     };


     const changeProject = (finance_id: string, project_name: string) => {
          const project_id = findProjectID(project_name);
          console.log(project_id)
          const allFinances: FinanceInterface[] = [...finances]; // Copy the array
          const financeIndex = allFinances.findIndex(finance => finance.project_id === finance_id);
          if (financeIndex === -1) return;

          console.log(financeIndex, finance_id)

          allFinances[financeIndex].project_id = project_id;
          setFinances(allFinances);
          SetItem('finances', allFinances);
     };

     const changeTitle = (finance_id: string, expense_index: number, title: string) => {
          console.log(finance_id, expense_index)
          updateFinanceData(finance_id, expense_index, 'other_expenses_name', title);
     };

     const changeDate = (finance_id: string, expense_index: number, date: string) => {
          updateFinanceData(finance_id, expense_index, 'other_expenses_date', date);
     };

     const changeDescription = (finance_id: string, expense_index: number, description: string) => {
          updateFinanceData(finance_id, expense_index, 'other_expenses_description', description);
     };

     const changeCategory = (finance_id: string, expense_index: number, category: string) => {
          updateFinanceData(finance_id, expense_index, 'other_expenses_category', category);
     };

     const changeStatus = (finance_id: string, expense_index: number, status: string) => {
          updateFinanceData(finance_id, expense_index, 'other_expenses_status', status);
     };

     const changeAmount = (finance_id: string, expense_index: number, amount: number) => {
          updateFinanceData(finance_id, expense_index, 'other_expenses_amount', amount);
     };

     const allProjects = projects.map((project) => project.name);

     const findProject = (project_id: string) => {
          const project = projects.find((project: ProjectInterface) => project.project_id === project_id);
          return project ? project.name : '';
     };

     const findProjectID = (project_name: string) => {
          const project = projects.find((project: ProjectInterface) => project.name === project_name);
          return project ? project.project_id : '';
     };

     const applyFilters = (finance: FinanceInterface) => {
          return (
               finance.project_id.toLowerCase().includes(findProjectID(filteredProject).toLowerCase()) &&
               finance.other_expenses.some(exp =>
                    exp.other_expenses_name.toLowerCase().includes(filteredTitle.toLowerCase()) &&
                    exp.other_expenses_date.toLowerCase().includes(filteredDate.toLowerCase()) &&
                    exp.other_expenses_description.toLowerCase().includes(filteredDescription.toLowerCase()) &&
                    exp.other_expenses_category.toLowerCase().includes(filteredCategory.toLowerCase()) &&
                    exp.other_expenses_status.toLowerCase().includes(filteredStatus.toLowerCase()) &&
                    exp.other_expenses_amount.toString().toLowerCase().includes(filteredAmount.toLowerCase())
               )
          );
     };

     const [animations, setAnimations] = useState(false)
     function startAnimations() {
          setAnimations(true);
          setTimeout(() => {
               setAnimations(false)
          }, 1500);
     }
     useEffect(() => {
          startAnimations();
     }, [])

     return (
          <div>
               <h2 className='mt-10 text-2xl font-semibold'>Other Expenses Tracker</h2>
               <div className={`card card-table !w-fit overflow-x-auto ${animations ? 'skeleton slide-up' : 'bg-base-100'}`}>
                    <table className="table cursor-default text-xl">

                         <thead>
                              <tr className="text-xl">
                                   <th>Project Name</th>
                                   <th>Expense Title</th>
                                   <th>Date</th>
                                   <th>Description</th>
                                   <th>Category</th>
                                   <th>Status</th>
                                   <th className="w-full flex flex-row justify-between">
                                        Amount
                                        <button onClick={() => setShowFilters(!showFilters)}>
                                             <i className="fas fa-filter"></i>
                                        </button>
                                   </th>
                              </tr>
                              {showFilters && (
                                   <tr className="text-xl bg-base-200 !rounded-xl">
                                        <td>
                                             <select
                                                  className='select select-bordered w-full'
                                                  value={filteredProject}
                                                  onChange={(e) => setFilteredProject(e.target.value)}
                                             >
                                                  <option value=''>Select</option>
                                                  {allProjects.map((name) => (
                                                       <option key={name} value={name}>{name}</option>
                                                  ))}
                                             </select>
                                        </td>
                                        <td>
                                             <input
                                                  className="border-none focus:outline-none bg rounded-md p-2"
                                                  type="text"
                                                  placeholder="Expense Title"
                                                  value={filteredTitle}
                                                  onChange={(e) => setFilteredTitle(e.target.value)}
                                             />
                                        </td>
                                        <td>
                                             <input
                                                  className="border-none focus:outline-none bg rounded-md p-2"
                                                  type="date"
                                                  value={filteredDate}
                                                  onChange={(e) => setFilteredDate(e.target.value)}
                                             />
                                        </td>
                                        <td>
                                             <input
                                                  className="border-none focus:outline-none bg rounded-md p-2"
                                                  type="text"
                                                  placeholder="Description"
                                                  value={filteredDescription}
                                                  onChange={(e) => setFilteredDescription(e.target.value)}
                                             />
                                        </td>
                                        <td>
                                             <input
                                                  className="border-none focus:outline-none bg rounded-md p-2"
                                                  type="text"
                                                  placeholder="Category"
                                                  value={filteredCategory}
                                                  onChange={(e) => setFilteredCategory(e.target.value)}
                                             />
                                        </td>
                                        <td>
                                             <select
                                                  className='select select-bordered w-full text-xl'
                                                  value={filteredStatus}
                                                  onChange={(e) => setFilteredStatus(e.target.value)}
                                             >
                                                  <option value=''>Select</option>
                                                  {StatusOptions.map((status) => (
                                                       <option key={status} value={status}>{status}</option>
                                                  ))}
                                             </select>
                                        </td>
                                        <td>
                                             <input
                                                  className="border-none focus:outline-none bg rounded-md p-2"
                                                  type="number"
                                                  placeholder="Amount"
                                                  value={filteredAmount}
                                                  onChange={(e) => setFilteredAmount(e.target.value)}
                                             />
                                        </td>
                                   </tr>
                              )}
                         </thead>
                         <tbody>
                              {finances
                                   .filter(applyFilters)
                                   .map((finance: FinanceInterface) =>
                                        finance.other_expenses.map((exp, index) => (
                                             <tr key={index} className="hover:bg-base-300 rounded-xl">
                                                  <td>
                                                       <select
                                                            className='select select-bordered w-full'
                                                            value={findProject(finance.project_id)}
                                                            onChange={(e) => changeProject(finance.project_id, e.target.value)}
                                                            disabled
                                                       >
                                                            {allProjects.map((name) => (
                                                                 <option key={name} value={name}>{name}</option>
                                                            ))}
                                                       </select>
                                                  </td>
                                                  <td>
                                                       <input
                                                            className="border-none focus:outline-none bg rounded-md p-2"
                                                            type="text"
                                                            value={exp.other_expenses_name}
                                                            onChange={(e) => changeTitle(finance.project_id, index, e.target.value)}
                                                       />
                                                  </td>
                                                  <td>
                                                       <input
                                                            className="border-none focus:outline-none bg rounded-md p-2"
                                                            type="date"
                                                            value={exp.other_expenses_date}
                                                            onChange={(e) => changeDate(finance.project_id, index, e.target.value)}
                                                       />
                                                  </td>
                                                  <td>
                                                       <input
                                                            className="border-none focus:outline-none bg rounded-md p-2"
                                                            type="text"
                                                            value={exp.other_expenses_description}
                                                            onChange={(e) => changeDescription(finance.project_id, index, e.target.value)}
                                                       />
                                                  </td>
                                                  <td>
                                                       <input
                                                            className="border-none focus:outline-none bg rounded-md p-2"
                                                            type="text"
                                                            value={exp.other_expenses_category}
                                                            onChange={(e) => changeCategory(finance.project_id, index, e.target.value)}
                                                       />
                                                  </td>
                                                  <td>
                                                       <select
                                                            className='select select-bordered w-full text-xl'
                                                            value={exp.other_expenses_status}
                                                            onChange={(e) => changeStatus(finance.project_id, index, e.target.value)}
                                                       >
                                                            {StatusOptions.map((status) => (
                                                                 <option key={status} value={status}>{status}</option>
                                                            ))}
                                                       </select>
                                                  </td>
                                                  <td>
                                                       <input
                                                            className="border-none focus:outline-none bg rounded-md p-2"
                                                            type="number"
                                                            value={exp.other_expenses_amount}
                                                            onChange={(e) => changeAmount(finance.project_id, index, parseFloat(e.target.value))}
                                                       />
                                                  </td>
                                             </tr>
                                        ))
                                   )}
                         </tbody>
                    </table>
               </div>
          </div>
     );
};
