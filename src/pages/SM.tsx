import { useEffect, useState } from "react";
import { Button, Card, Select, TextInput } from "flowbite-react";
import TaskInterface from "../interfaces/TaskInterface";
import ProjectInterface from "../interfaces/ProjectInterface";
import EmployeeInterface from "../interfaces/EmployeeInterface";
import StatusOptions from "../interfaces/StatusOptions";
import FinanceInterface from "../interfaces/FinanceInterface";

export const SM = () => {
     const [tasks, setTasks] = useState<TaskInterface[]>([]);
     const [projects, setProjects] = useState<ProjectInterface[]>([]);
     const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
     const [finances, setFinances] = useState<FinanceInterface[]>([]);

     useEffect(() => {
          const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
          setTasks(tasks);
          const projects = JSON.parse(localStorage.getItem('projects') || '[]');
          setProjects(projects);
          const employees = JSON.parse(localStorage.getItem('employees') || '[]');
          setEmployees(employees);
          const finances = JSON.parse(localStorage.getItem('finances') || '[]');
          setFinances(finances);
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
          localStorage.setItem('tasks', JSON.stringify(tasks));
     };

     return (
          <div>
               <h1>SM</h1>
               <ul>
                    {
                         employees.map((employee: EmployeeInterface) => (
                              <li key={employee.employee_id} className="bg-gray-50 m-3">
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
               <ul>
                    {
                         projects.map((project: ProjectInterface) => (
                              <li key={project.project_id} className="bg-blue-50 m-3">
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
               <ul>
                    {tasks.map((task: TaskInterface) => (
                         <div key={task.task_id} className='flex flex-col bg-red-50 m-3'>
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
                              StatusOptions.map((status: string) => (
                                   <option value={status}>{status}</option>
                              ))
                         }
                    </Select>
                    <Select value={newTaskProjectID} onChange={(e) => setNewTaskProjectID(e.target.value)}>
                         <option value="">Select Project</option>
                         {projects.map((project: ProjectInterface) => (
                              <option value={project.project_id}>{project.name}</option>
                         ))}
                    </Select>
                    <Select value={newTaskEmployeeID} onChange={(e) => setNewTaskEmployeeID(e.target.value)}>
                         <option value="">Select Employee</option>
                         {employees.map((employee: EmployeeInterface) => (
                              <option value={employee.employee_id}>{employee.name}</option>
                         ))}
                    </Select>
                    <Button onClick={addTask}>
                         Add Task
                    </Button>
               </Card>
          </div>
     )
}