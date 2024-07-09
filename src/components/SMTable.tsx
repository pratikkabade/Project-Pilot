import { useEffect, useState } from "react";
import TaskInterface from "../interfaces/TaskInterface";
import ProjectInterface from "../interfaces/ProjectInterface";
import EmployeeInterface from "../interfaces/EmployeeInterface";
import StatusOptions from "../interfaces/StatusOptions";
import PageName from "../functions/PageName";
import { GetItem, SetItem } from "../functions/ArrayData";

export const SMTable = () => {
     const [projects, setProjects] = useState<ProjectInterface[]>([]);
     const [employees, setEmployees] = useState<EmployeeInterface[]>([]);

     const [showFilters, setShowFilters] = useState(false);
     const [filteredProject, setFilteredProject] = useState('');
     const [filteredEmployee, setFilteredEmployee] = useState('');
     const [filteredTitle, setFilteredTitle] = useState('');
     const [filteredDescription, setFilteredDescription] = useState('');
     const [filteredStatus, setFilteredStatus] = useState('');

     const [thisTasks, setThisTasks] = useState<TaskInterface[]>([]);

     function getTasks() {
          const employees: EmployeeInterface[] = GetItem('employees');
          setEmployees(employees);
          const allTasks: TaskInterface[] = GetItem('tasks');
          setThisTasks(allTasks);
     }

     useEffect(() => {
          getTasks();

          const projects = GetItem('projects');
          setProjects(projects);
          PageName('SM');
     }, []);


     const changeProject = (task_id: number, project_name: string) => {
          const project_id = projects
               .find((project: ProjectInterface) => project.name === project_name)?.project_id || ''
          const allTasks: TaskInterface[] = GetItem('tasks');
          const changedTaskIndex = allTasks.findIndex((task: TaskInterface) => task.task_id === task_id);
          allTasks[changedTaskIndex].project_id = project_id;
          setThisTasks(allTasks);
          SetItem('tasks', allTasks);
          getTasks();
     };

     const changeEmployee = (task_id: number, employee_name: string) => {
          const employee_id = employees
               .find((employee: EmployeeInterface) => employee.name === employee_name)?.employee_id || ''
          const allTasks: TaskInterface[] = GetItem('tasks');
          const changedTaskIndex = allTasks.findIndex((task: TaskInterface) => task.task_id === task_id);
          allTasks[changedTaskIndex].employee_id = employee_id;
          setThisTasks(allTasks);
          SetItem('tasks', allTasks);
          getTasks();
     };

     const changeTitle = (task_id: number, title: string) => {
          const allTasks: TaskInterface[] = GetItem('tasks');
          const changedTaskIndex = allTasks.findIndex((task: TaskInterface) => task.task_id === task_id);
          allTasks[changedTaskIndex].title = title;
          setThisTasks(allTasks);
          SetItem('tasks', allTasks);
          getTasks();
     };

     const changeDescription = (task_id: number, description: string) => {
          const allTasks: TaskInterface[] = GetItem('tasks');
          const changedTaskIndex = allTasks.findIndex((task: TaskInterface) => task.task_id === task_id);
          allTasks[changedTaskIndex].description = description;
          setThisTasks(allTasks);
          SetItem('tasks', allTasks);
          getTasks();
     };

     const changeStatus = (task_id: number, status: string) => {
          const allTasks: TaskInterface[] = GetItem('tasks');
          const changedTaskIndex = allTasks.findIndex((task: TaskInterface) => task.task_id === task_id);
          allTasks[changedTaskIndex].status = status;
          setThisTasks(allTasks);
          SetItem('tasks', allTasks);
          getTasks();
     };

     const allEmployees = employees.map((emp) => emp.name)
     const allProjects = projects.map((project) => project.name)

     const findEmployee = (emp: any) => employees
          .find((employee: EmployeeInterface) => employee.employee_id === emp.employee_id)?.name || ''

     const findEmployeeID = (employee_name: string) => employees
          .find((employee: EmployeeInterface) => employee.name === employee_name)?.employee_id || ''

     const findProject = (thisProject: any) => projects
          .find((project: ProjectInterface) => project.project_id === thisProject.project_id)?.name

     const findProjectID = (project_name: string) => projects
          .find((project: ProjectInterface) => project.name === project_name)?.project_id || ''

     return (
          <div>
               <h2 className=' mt-10 text-2xl font-semibold'>Tasks insight</h2>
               <div className="card card-table">
                    <table className="table cursor-default text-xl">
                         <thead>
                              <tr className="text-xl">
                                   <th>Project Name</th>
                                   <th>Assigned to</th>
                                   <th>Task Title</th>
                                   <th>Description</th>
                                   <th className="w-full flex flex-row justify-between">
                                        Status
                                        <button onClick={() => setShowFilters(!showFilters)}>
                                             <i className="fas fa-filter"></i>
                                        </button>
                                   </th>
                              </tr>
                              {
                                   showFilters &&
                                   <tr className="text-xl bg-base-200 !rounded-xl">
                                        <td>
                                             <select
                                                  className='select select-bordered w-full'
                                                  onChange={(e) => {
                                                       setFilteredProject(e.target.value)
                                                  }}
                                             >
                                                  <option
                                                       value=''
                                                       onChange={() => setFilteredProject('')}>
                                                       Select
                                                  </option>
                                                  {allProjects.map((name) => (
                                                       <option key={name} value={name}>
                                                            {name}
                                                       </option>
                                                  ))}
                                             </select>
                                        </td>
                                        <td>
                                             <select
                                                  className='select select-bordered w-full'
                                                  onChange={(e) => {
                                                       setFilteredEmployee(e.target.value)
                                                  }}
                                             >
                                                  <option
                                                       value=''
                                                       onChange={() => setFilteredProject('')}>
                                                       Select
                                                  </option>
                                                  {allEmployees.map((name) => (
                                                       <option key={name} value={name}>
                                                            {name}
                                                       </option>
                                                  ))}
                                             </select>
                                        </td>
                                        <td>
                                             <input
                                                  className="border-none focus:outline-none bg rounded-md p-2"
                                                  type="text"
                                                  placeholder="Task Title"
                                                  onChange={(e) => {
                                                       setFilteredTitle(e.target.value)
                                                  }}
                                             />
                                        </td>
                                        <td>
                                             <input
                                                  className="border-none focus:outline-none bg rounded-md p-2"
                                                  type="text"
                                                  placeholder="Description"
                                                  onChange={(e) => {
                                                       setFilteredDescription(e.target.value)
                                                  }}
                                             />
                                        </td>
                                        <td>
                                             <select
                                                  className='select select-bordered w-full text-xl'
                                                  onChange={(e) => {
                                                       setFilteredStatus(e.target.value)
                                                  }}
                                             >
                                                  <option
                                                       value=''
                                                       onChange={() => setFilteredProject('')}>
                                                       Select
                                                  </option>
                                                  {StatusOptions.map((status) => (
                                                       <option key={status} value={status}>
                                                            {status}
                                                       </option>
                                                  ))}
                                             </select>
                                        </td>
                                   </tr>
                              }

                         </thead>
                         <tbody>
                              {thisTasks
                                   .filter((task: TaskInterface) => task.project_id.toLowerCase().includes(findProjectID(filteredProject).toLowerCase()))
                                   .filter((task: TaskInterface) => task.employee_id.toLowerCase().includes(findEmployeeID(filteredEmployee).toLowerCase()))
                                   .filter((task: TaskInterface) => task.title.toLowerCase().includes(filteredTitle.toLowerCase()))
                                   .filter((task: TaskInterface) => task.description.toLowerCase().includes(filteredDescription.toLowerCase()))
                                   .filter((task: TaskInterface) => task.status.toLowerCase().includes(filteredStatus.toLowerCase()))
                                   .map((task: TaskInterface, index) => (
                                        <tr
                                             key={index}
                                             className={`rounded-xl ${task.status === "completed" ? 'text-success hover:bg-green-50 dark:hover:bg-green-900' : 'text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900'}`}>
                                             <th>
                                                  <select
                                                       className='select select-bordered w-full'
                                                       value={findProject(task)}
                                                       onChange={(e) => changeProject(task.task_id, e.target.value)}
                                                  >
                                                       {allProjects.map((name) => (
                                                            <option key={name} value={name}>
                                                                 {name}
                                                            </option>
                                                       ))}
                                                  </select>
                                             </th>
                                             <td>
                                                  <select
                                                       className='select select-bordered w-full'
                                                       value={findEmployee(task)}
                                                       onChange={(e) => changeEmployee(task.task_id, e.target.value)}
                                                  >
                                                       {allEmployees.map((name) => (
                                                            <option key={name} value={name}>
                                                                 {name}
                                                            </option>
                                                       ))}
                                                  </select>
                                             </td>
                                             <td>
                                                  <input
                                                       className="border-none focus:outline-none bg rounded-md p-2"
                                                       type="text"
                                                       value={task.title}
                                                       onChange={(e) => changeTitle(task.task_id, e.target.value)} />
                                             </td>
                                             <td>
                                                  <input
                                                       className="border-none focus:outline-none bg rounded-md p-2"
                                                       type="text"
                                                       value={task.description}
                                                       onChange={(e) => changeDescription(task.task_id, e.target.value)} />
                                             </td>
                                             <td>
                                                  <select
                                                       className='select select-bordered w-full text-xl'
                                                       value={task.status}
                                                       onChange={(e) => changeStatus(task.task_id, e.target.value)}
                                                  >
                                                       {StatusOptions.map((status) => (
                                                            <option key={status} value={status}>
                                                                 {status}
                                                            </option>
                                                       ))}
                                                  </select>
                                             </td>
                                        </tr>
                                   ))}
                         </tbody>
                    </table>
               </div>
          </div>
     )
}