import { useEffect, useReducer, useState } from "react";
import TaskInterface from "../interfaces/TaskInterface";
import ProjectInterface from "../interfaces/ProjectInterface";
import EmployeeInterface from "../interfaces/EmployeeInterface";
import StatusOptions from "../interfaces/StatusOptions";
import PageName from "../functions/PageName";
import { GetItem, SetItem } from "../functions/ArrayData";
import { SMTable } from "../components/sm/SMTable";

export const SM = () => {
     const [tasks, setTasks] = useState<TaskInterface[]>([]);
     const [projects, setProjects] = useState<ProjectInterface[]>([]);
     const [employees, setEmployees] = useState<EmployeeInterface[]>([]);

     const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

     useEffect(() => {
          const tasks = GetItem('tasks');
          setTasks(tasks);
          const projects = GetItem('projects');
          setProjects(projects);
          const employees = GetItem('employees');
          setEmployees(employees);
          PageName('SM');
          forceUpdate();
     }, [ignored]);

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


     const [newTask, setNewTask] = useState('');
     const [newTaskDescription, setNewTaskDescription] = useState('');
     const [newTaskProjectID, setNewTaskProjectID] = useState('');
     const [newTaskEmployeeID, setNewTaskEmployeeID] = useState('');
     const [newTaskStatus, setNewTaskStatus] = useState('Pending');

     const addTask = () => {
          tasks.push({
               task_id: tasks.length + 1,
               title: newTask,
               description: newTaskDescription,
               status: newTaskStatus,
               project_id: newTaskProjectID,
               employee_id: newTaskEmployeeID
          });
          setNewTask('');
          setNewTaskDescription('');
          setNewTaskProjectID('');
          setNewTaskEmployeeID('');
          SetItem('tasks', tasks);
     };

     function calculateTaskCompletionRateEMP(tasks: TaskInterface[], employeeId: string): number {
          const employeeTasks = tasks.filter(task => task.employee_id === employeeId);
          const completedTasks = employeeTasks.filter(task => task.status === 'completed').length;
          const totalTasks = employeeTasks.length;
          return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
     }

     function calculateTaskCompletionRatePROJ(tasks: TaskInterface[], projectId: string): number {
          const employeeTasks = tasks.filter(task => task.project_id === projectId);
          const completedTasks = employeeTasks.filter(task => task.status === 'completed').length;
          const totalTasks = employeeTasks.length;
          return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
     }

     const checkProjectStatus = (project: any) => tasks.filter((task: TaskInterface) => task.project_id === project.project_id && task.status === 'completed').length === tasks.filter((task: TaskInterface) => task.project_id === project.project_id).length ? 'Completed' : 'Pending'

     const checkEmployeeStatus = (employee: any) => tasks.filter((task: TaskInterface) => task.employee_id === employee.employee_id && task.status === 'completed').length === tasks.filter((task: TaskInterface) => task.employee_id === employee.employee_id).length ? 'Completed' : 'Pending'


     return (
          <div className="p-5">
               <h1 className='text-5xl font-bold'>Welcome back, SM</h1>


               <h2 className=' mt-10 text-2xl font-semibold'>Employees insight</h2>
               <div className="flex flex-row flex-wrap">
                    {
                         employees.map((employee: EmployeeInterface, index) => (
                              <div key={index} className={`card m-3 ${animations ? 'bg-base-100 slide-up' : 'bg-base-100'}`}>
                                   <h3 className='text-2xl font-semibold'>
                                        {employee.name}
                                        <span className={`font-semibold ${checkEmployeeStatus(employee) === "Completed" ? 'text-success' : 'text-warning'}`}>
                                             <span className='text-xl font-bold ml-2'>
                                                  ({
                                                       tasks.filter((task: TaskInterface) => task.employee_id === employee.employee_id && task.status === 'completed').length
                                                  }/
                                                  {
                                                       tasks.filter((task: TaskInterface) => task.employee_id === employee.employee_id).length
                                                  })
                                             </span>
                                        </span>
                                   </h3>
                                   <progress className={`progress w-56 ${checkEmployeeStatus(employee) === "Completed" ? 'progress-success' : 'progress-warning'}`} value={
                                        calculateTaskCompletionRateEMP(tasks, employee.employee_id)
                                   } max="100"></progress>
                              </div>
                         ))
                    }
               </div>

               <h2 className=' mt-10 text-2xl font-semibold'>Projects insight</h2>
               <div className="flex flex-row flex-wrap">
                    {
                         projects.map((project: ProjectInterface, index) => (
                              <div key={index} className={`card ${animations ? 'bg-base-100 slide-up' : 'bg-base-100'}`}>
                                   <h3 className='text-2xl font-bold'>
                                        {project.name}
                                        <span className={`font-semibold ${checkProjectStatus(project) === "Completed" ? 'text-success' : 'text-warning'}`}>
                                             <span className='text-xl font-bold ml-2'>
                                                  ({
                                                       tasks.filter((task: TaskInterface) => task.project_id === project.project_id && task.status === 'completed').length
                                                  }/
                                                  {
                                                       tasks.filter((task: TaskInterface) => task.project_id === project.project_id).length
                                                  })
                                             </span>
                                        </span>
                                   </h3>
                                   <progress className={`progress w-56 ${checkProjectStatus(project) === "Completed" ? 'progress-success' : 'progress-warning'}`} value={
                                        calculateTaskCompletionRatePROJ(tasks, project.project_id)
                                   } max="100"></progress>
                              </div>
                         ))
                    }
               </div>


               <SMTable />


               <h2 className=' mt-10 text-2xl font-semibold'>Create Tasks</h2>
               <div className="flex flex-row">
                    <div className={`card ${animations ? 'bg-base-100 slide-up' : 'bg-base-100'}`}>
                         <input
                              type="text"
                              placeholder="Title"
                              value={newTask}
                              className="input input-bordered"
                              onChange={(e) => setNewTask(e.target.value)}
                              required />
                         <input
                              type="text"
                              placeholder="Description"
                              className="input input-bordered"
                              value={newTaskDescription}
                              onChange={(e) => setNewTaskDescription(e.target.value)}
                              required />
                         <select
                              value={newTaskStatus}
                              onChange={(e) => setNewTaskStatus(e.target.value)}
                              className="select select-bordered w-full ">
                              <option value="">Select Status</option>
                              {
                                   StatusOptions.map((status: string, index) => (
                                        <option key={index} value={status}>{status}</option>
                                   ))
                              }
                         </select>
                         <select
                              value={newTaskProjectID}
                              onChange={(e) => setNewTaskProjectID(e.target.value)}
                              className="select select-bordered w-full ">
                              <option value="">Select Project</option>
                              {projects.map((project: ProjectInterface, index) => (
                                   <option key={index} value={project.project_id}>{project.name}</option>
                              ))}
                         </select>
                         <select
                              value={newTaskEmployeeID}
                              onChange={(e) => setNewTaskEmployeeID(e.target.value)}
                              className="select select-bordered w-full ">
                              <option value="">Select Employee</option>
                              {employees.map((employee: EmployeeInterface, index) => (
                                   <option key={index} value={employee.employee_id}>{employee.name}</option>
                              ))}
                         </select>
                         <button className="btn btn-primary"
                              onClick={addTask}>
                              Add Task
                         </button>
                    </div>
               </div>
          </div>
     )
}