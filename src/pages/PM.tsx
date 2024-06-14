import { useEffect, useState } from 'react';
import ProjectInterface from '../interfaces/ProjectInterface';
import EmployeeInterface from '../interfaces/EmployeeInterface';
import PageName from '../functions/PageName';
import { GetItem, SetItem } from '../functions/ArrayData';

export const PM = () => {
     const projects = GetItem('projects');
     const employees = GetItem('employees');
     const finances = GetItem('finances');
     const tasks = GetItem('tasks');

     const [newProject, setNewProject] = useState('');

     const addProject = () => {
          projects.push({
               project_id: 'p' + String(projects.length + 1),
               name: newProject,
          });
          finances.push({
               project_id: 'p' + String(projects.length),
               amount: 0,
               other_expenses: []
          });
          setNewProject('');
          SetItem('projects', projects);
          SetItem('finances', finances)
     };


     useEffect(() => {
          PageName('PM');
     }, []);

     const totalAmount = finances.reduce((acc: number, finance: any) => acc + finance.amount, 0)
     const totalOtherExpenses = finances.reduce((acc: number, finance: any) => acc +
          finance.other_expenses.reduce((acc: number, other_expense: any) => acc +
               other_expense.other_expenses_amount, 0), 0)
     const amountLeft = totalAmount - totalOtherExpenses
     const percentageAvailableFunds = Math.floor((amountLeft / totalAmount) * 100);

     const employeesCount = employees.length
     const employeesAvailable = employees.filter((employee: EmployeeInterface) =>
          !tasks.map((task: any) => task.employee_id).includes(employee.employee_id)
     )
     const employeesWithCompletedTasks = employees.filter((employee: EmployeeInterface) =>
          tasks.every((task: any) => task.employee_id === employee.employee_id ? task.status === 'completed' : true)
     )

     function calculateTaskCompletionRate(project_id: string) {
          const tasksCount = tasks.filter((task: any) => task.project_id === project_id).length
          const completedTasks = tasks.filter((task: any) => task.project_id === project_id && task.status === 'completed').length
          return (completedTasks / tasksCount) * 100
     }

     const tasksCount = tasks.length
     const completedTasks = tasks.filter((task: any) => task.status === 'completed').length
     const percentageTasksLeft = 100 - (completedTasks / tasksCount) * 100

     return (
          <div className="p-5">
               <h1 className='text-5xl font-bold'>Welcome back, PM</h1>
               <h2 className=' mt-10 text-2xl font-semibold'>Quick insight</h2>
               <div className='flex flex-row flex-wrap'>
                    <div className='card bg-base-100 w-96 shadow-xl p-5 gap-4 flex flex-col m-5'>
                         <h3 className='text-2xl font-semibold'>Finances</h3>
                         <h3 className='text-xl font-normal'>
                              Funds availability
                              <span className='font-bold ml-2'>{percentageAvailableFunds}%</span>
                         </h3>
                         <h3 className='text-xl font-normal'>
                              Total Funds
                              <span className='font-bold ml-2'>{totalAmount}</span>
                         </h3>
                         <h3 className='text-xl font-normal'>
                              Utilized Funds
                              <span className='font-bold ml-2'>{totalOtherExpenses}</span>
                         </h3>
                         <h3 className='text-xl font-normal'>
                              Available Funds
                              <span className='font-bold ml-2'>{amountLeft}</span>
                         </h3>
                         {/* <div className={`radial-progress 
                              ${percentageAvailableFunds > 60 ? 'text-success' :
                                   percentageAvailableFunds > 40 ? 'text-warning' : 'text-error'}`} style={{ "--value": percentageAvailableFunds }} role="progressbar">
                              {percentageAvailableFunds}%
                         </div> */}
                    </div>
                    <div className='card'>
                         <h3 className='text-2xl font-semibold'>Employees</h3>
                         <h3 className='text-xl font-normal'>
                              Total Employees
                              <span className='font-bold ml-2'>{employeesCount}</span>
                         </h3>
                         <h3 className='text-xl font-normal'>
                              Employees available
                              <span className='font-bold ml-2'>{employeesAvailable.map((employee: EmployeeInterface) => employee.name).join(', ')}</span>
                              <span className='font-extrabold ml-2'>({employeesAvailable.length})</span>
                         </h3>
                         {/* <progress className={`progress 
                              ${employeesAvailable/employeesCount > 60 ? 'progress-success' :
                                   employeesAvailable/employeesCount > 40 ? 'progress-warning' : 'progress-error'}`} value={
                                        employeesAvailable/employeesCount
                                   } max={employeesCount}></progress> */}
                         <h3 className='text-xl font-normal'>
                              Employees with completed tasks
                              <span className='font-bold ml-2'>{employeesWithCompletedTasks.map((employee: EmployeeInterface) => employee.name).join(', ')}</span>
                              <span className='font-extrabold ml-2'>({employeesWithCompletedTasks.length})</span>
                         </h3>
                         {/* <progress className={`progress 
                              ${employeesWithCompletedTasks.length/employeesCount > 60 ? 'progress-success' :
                                   employeesWithCompletedTasks.length/employeesCount > 40 ? 'progress-warning' : 'progress-error'}`} value={
                                        employeesWithCompletedTasks.length/employeesCount
                                   } max={employeesCount}></progress> */}
                    </div>
                    <div className='card'>
                         <h3 className='text-2xl font-semibold'>Tasks</h3>
                         <h3 className='text-xl font-normal'>
                              Completed Tasks:
                              <span className='font-bold ml-2'>{completedTasks}/{tasksCount}</span>
                         </h3>
                         <h3 className='text-xl font-normal'>
                              Work Pending:
                              <span className='font-bold ml-2'>{percentageTasksLeft.toFixed(2)}%</span>
                         </h3>
                         <progress className={`progress 
                              ${percentageTasksLeft > 60 ? 'progress-success' :
                                   percentageTasksLeft > 40 ? 'progress-warning' : 'progress-error'}`} value={
                                        percentageTasksLeft
                                   } max="100"></progress>
                    </div>
               </div>


               <h2 className=' mt-10 text-2xl font-semibold'>Project Details</h2>
               <div className='flex flex-row flex-wrap'>
                    {projects.map((project: ProjectInterface) => (
                         <div key={project.project_id} className='card'>
                              <h3 className='text-2xl font-semibold'>{project.name}</h3>
                              <h3 className='text-xl font-normal'>
                                   Completed Tasks:
                                   <span className='font-bold ml-2'>
                                        {
                                             tasks.filter((task: any) => task.project_id === project.project_id && task.status === 'completed').length
                                        }/
                                        {
                                             tasks.filter((task: any) => task.project_id === project.project_id).length
                                        }
                                   </span>
                              </h3>
                         <progress className={`progress 
                              ${calculateTaskCompletionRate(project.project_id) > 60 ? 'progress-success' :
                                   calculateTaskCompletionRate(project.project_id) > 40 ? 'progress-warning' : 'progress-error'}`} value={
                                        calculateTaskCompletionRate(project.project_id)
                                   } max="100"></progress>
                              <h3 className='text-xl font-normal'>
                                   Employees Assigned:
                                   <span className='font-bold ml-2'>
                                        (
                                        {
                                             tasks
                                                  .filter((task: any) => task.project_id === project.project_id)
                                                  .map((task: any) => task.employee_id)
                                                  .filter((employee_id: string, index: number, self: string[]) => self.indexOf(employee_id) === index)
                                                  .length
                                        }
                                        )
                                        {
                                             tasks
                                                  .filter((task: any) => task.project_id === project.project_id)
                                                  .map((task: any) => task.employee_id)
                                                  .filter((employee_id: string, index: number, self: string[]) => self.indexOf(employee_id) === index)
                                                  .map((employee_id: string) =>
                                                       employees.find((employee: EmployeeInterface) => employee.employee_id === employee_id)?.name
                                                  )
                                                  .join(', ')
                                        }
                                   </span>
                              </h3>


                              <h3 className='text-xl font-normal'>
                                   Funds planning to allocate:
                                   <span className='font-bold ml-2'>
                                        {
                                             finances
                                                  .filter((finance: any) => finance.project_id === project.project_id)
                                                  .reduce((acc: number, finance: any) => acc + finance.amount, 0)
                                        }
                                   </span>
                              </h3>

                              <h3 className='text-xl font-normal'>
                                   Funds utilized so far:
                                   <span className='font-bold ml-2'>
                                        {
                                             finances.
                                                  filter((finance: any) => finance.project_id === project.project_id)?.
                                                  reduce((acc: number, finance: any) => acc +
                                                       finance.other_expenses.reduce((acc: number, other_expense: any) => acc +
                                                            other_expense.other_expenses_amount, 0), 0)
                                        }
                                   </span>
                              </h3>
                         </div>
                    ))}

               </div>


               <h2 className=' mt-10 text-2xl font-semibold'>Add Project</h2>

               <div className='flex flex-row'>
                    <div className='card'>
                         <input
                              type="text"
                              placeholder='Add a new project'
                              value={newProject}
                              onChange={(e) => setNewProject(e.target.value)}
                              className="input input-bordered"
                              required />
                         <button
                              className="btn btn-primary"
                              onClick={addProject}>
                              Add
                         </button>
                    </div>
               </div>
          </div>
     );
}