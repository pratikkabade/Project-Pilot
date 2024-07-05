import { useEffect, useState } from "react";
import { Button, Card, Select, TextInput } from "flowbite-react";
import TaskInterface from "../interfaces/TaskInterface";
import ProjectInterface from "../interfaces/ProjectInterface";
import EmployeeInterface from "../interfaces/EmployeeInterface";
import StatusOptions from "../interfaces/StatusOptions";
import FinanceInterface from "../interfaces/FinanceInterface";
import PageName from "../functions/PageName";
import { GetItem, SetItem } from "../functions/ArrayData";

export const SM = () => {
     const [tasks, setTasks] = useState<TaskInterface[]>([]);
     const [projects, setProjects] = useState<ProjectInterface[]>([]);
     const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
     const [finances, setFinances] = useState<FinanceInterface[]>([]);

     useEffect(() => {
          const tasks = GetItem('tasks');
          setTasks(tasks);
          const projects = GetItem('projects');
          setProjects(projects);
          const employees = GetItem('employees');
          setEmployees(employees);
          const finances = GetItem('finances');
          setFinances(finances);
          PageName('SM');
     }, []);

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

     return (
          <div className="p-5">
               <h1 className='text-5xl font-bold'>Welcome back, SM</h1>


               <h2 className=' mt-10 text-2xl font-semibold'>Employees insight</h2>
               <div className="flex flex-row flex-wrap">
                    {
                         employees.map((employee: EmployeeInterface, index) => (
                              <Card key={index} className="m-3">
                                   <h3 className='text-2xl font-semibold'>
                                        {employee.name}
                                   </h3>
                                   <h3 className='text-xl font-normal'>
                                        Task Status:
                                        <span className='font-bold ml-2'>
                                             (
                                             {
                                                  tasks.filter((task: TaskInterface) => task.employee_id === employee.employee_id && task.status === 'completed').length
                                             }/
                                             {
                                                  tasks.filter((task: TaskInterface) => task.employee_id === employee.employee_id).length
                                             }
                                             )
                                        </span>
                                   </h3>
                              </Card>
                         ))
                    }
               </div>

               <h2 className=' mt-10 text-2xl font-semibold'>Projects insight</h2>
               <div className="flex flex-row flex-wrap">
                    {
                         projects.map((project: ProjectInterface, index) => (
                              <Card key={index} className=" m-5">
                                   <h3 className='text-2xl font-semibold'>
                                        {project.name}
                                   </h3>
                                   <h3 className='text-xl font-normal'>
                                        Completed tasks:
                                        <span className='font-bold ml-2'>
                                             ({
                                                  tasks.filter((task: TaskInterface) => task.project_id === project.project_id && task.status === 'completed').length
                                             }/
                                             {
                                                  tasks.filter((task: TaskInterface) => task.project_id === project.project_id).length
                                             })
                                        </span>
                                   </h3>
                                   <h3 className='text-xl font-normal'>
                                        Project Status:
                                        <span className='font-bold ml-2'>
                                             {
                                                  tasks.filter((task: TaskInterface) => task.project_id === project.project_id && task.status === 'completed').length === tasks.filter((task: TaskInterface) => task.project_id === project.project_id).length ? 'Completed' : 'Pending'
                                             }
                                        </span>
                                   </h3>
                                   <h3 className='text-xl font-normal'>
                                        Funds Allocated:
                                        <span className='font-bold ml-2'>
                                             {
                                                  finances.find((finance: FinanceInterface) => finance.project_id === project.project_id)?.amount
                                             }
                                        </span>
                                   </h3>

                              </Card>
                         ))
                    }
               </div>


               <h2 className=' mt-10 text-2xl font-semibold'>Tasks insight</h2>
               <div className="flex flex-row flex-wrap">
                    {tasks.map((task: TaskInterface, index) => (
                         <Card key={index} className='m-5'>
                              <h3 className='text-xl font-normal'>
                                   Task:
                                   <span className='font-bold ml-2'>
                                        {task.title}
                                   </span>
                              </h3>
                              <h3 className='text-xl font-normal'>
                                   Description:
                                   <span className='font-bold ml-2'>
                                        {task.description}
                                   </span>
                              </h3>
                              <h3 className='text-xl font-normal'>
                                   Task Status:
                                   <span className='font-bold ml-2'>
                                        {task.status}
                                   </span>
                              </h3>
                              <h3 className='text-xl font-normal'>
                                   Parent Project:
                                   <span className='font-bold ml-2'>
                                        {
                                             projects.find((project: ProjectInterface) => project.project_id === task.project_id)?.name
                                        }
                                   </span>
                              </h3>
                              <h3 className='text-xl font-normal'>
                                   Assigned to:
                                   <span className='font-bold ml-2'>
                                        {
                                             employees.find((employee: EmployeeInterface) => employee.employee_id === task.employee_id)?.name
                                        }
                                   </span>
                              </h3>
                         </Card>
                    ))}
               </div>


               <h2 className=' mt-10 text-2xl font-semibold'>Create Tasks</h2>
               <div className="flex flex-row">
                    <Card className="m-5">
                         <TextInput
                              placeholder="Title"
                              value={newTask}
                              onChange={(e) => setNewTask(e.target.value)}
                         />
                         <TextInput
                              placeholder="Description"
                              value={newTaskDescription}
                              onChange={(e) => setNewTaskDescription(e.target.value)}
                         />
                         <Select value={newTaskStatus} onChange={(e) => setNewTaskStatus(e.target.value)}>
                              <option value="">Select Status</option>
                              {
                                   StatusOptions.map((status: string, index) => (
                                        <option key={index} value={status}>{status}</option>
                                   ))
                              }
                         </Select>
                         <Select value={newTaskProjectID} onChange={(e) => setNewTaskProjectID(e.target.value)}>
                              <option value="">Select Project</option>
                              {projects.map((project: ProjectInterface, index) => (
                                   <option key={index} value={project.project_id}>{project.name}</option>
                              ))}
                         </Select>
                         <Select value={newTaskEmployeeID} onChange={(e) => setNewTaskEmployeeID(e.target.value)}>
                              <option value="">Select Employee</option>
                              {employees.map((employee: EmployeeInterface, index) => (
                                   <option key={index} value={employee.employee_id}>{employee.name}</option>
                              ))}
                         </Select>
                         <Button onClick={addTask}>
                              Add Task
                         </Button>
                    </Card>
               </div>
          </div>
     )
}