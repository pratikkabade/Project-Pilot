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
          <div>
               <h1>SM</h1>
               <ul className="m-5">
                    {
                         employees.map((employee: EmployeeInterface, index) => (
                              <li key={index} className="m-3">
                                   {employee.name}
                                   |
                                   {
                                        tasks.filter((task: TaskInterface) => task.employee_id === employee.employee_id && task.status === 'completed').length
                                   }/
                                   {
                                        tasks.filter((task: TaskInterface) => task.employee_id === employee.employee_id).length
                                   }
                              </li>
                         ))
                    }
               </ul>
               <ul className="m-5">
                    {
                         projects.map((project: ProjectInterface, index) => (
                              <li key={index} className=" m-3">
                                   {project.name}
                                   |
                                   ({
                                        tasks.filter((task: TaskInterface) => task.project_id === project.project_id && task.status === 'completed').length
                                   }/
                                   {
                                        tasks.filter((task: TaskInterface) => task.project_id === project.project_id).length
                                   })
                                   |
                                   {
                                        tasks.filter((task: TaskInterface) => task.project_id === project.project_id && task.status === 'completed').length === tasks.filter((task: TaskInterface) => task.project_id === project.project_id).length ? 'Completed' : 'Pending'
                                   }
                                   |
                                   {
                                        finances.find((finance: FinanceInterface) => finance.project_id === project.project_id)?.amount
                                   }
                              </li>
                         ))
                    }
               </ul>
               <ul className="m-5">
                    {tasks.map((task: TaskInterface, index) => (
                         <div key={index} className='flex flex-col  m-3'>
                              <p>{task.title}</p>
                              <p>{task.description}</p>
                              <p>{task.status}</p>
                              <p>
                                   {
                                        projects.find((project: ProjectInterface) => project.project_id === task.project_id)?.name
                                   }
                              </p>
                              <p>
                                   {
                                        employees.find((employee: EmployeeInterface) => employee.employee_id === task.employee_id)?.name
                                   }
                              </p>
                         </div>
                    ))}
               </ul>
               <Card>
                    <TextInput
                         placeholder="title"
                         value={newTask}
                         onChange={(e) => setNewTask(e.target.value)}
                    />
                    <TextInput
                         placeholder="description"
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
     )
}