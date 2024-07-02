import { Button, Card, TextInput } from 'flowbite-react';
import { useState } from 'react';
import ProjectInterface from '../interfaces/ProjectInterface';
import EmployeeInterface from '../interfaces/EmployeeInterface';

export const PM = () => {
     const projects = JSON.parse(localStorage.getItem('projects') || '[]');
     const employees = JSON.parse(localStorage.getItem('employees') || '[]');
     const finances = JSON.parse(localStorage.getItem('finances') || '[]');
     const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

     const [newProject, setNewProject] = useState('');

     const addProject = () => {
          projects.push({
               project_id: 'p' + String(projects.length + 1),
               name: newProject,
          });
          setNewProject('');
          localStorage.setItem('projects', JSON.stringify(projects));
     };

     return (
          <div>
               <h1>PM</h1>
               <ul>
                    {projects.map((project: ProjectInterface) => (
                         <li key={project.project_id}>
                              {project.name}
                              |
                              {
                                   tasks.filter((task: any) => task.project_id === project.project_id &&
                                        task.status === 'completed').length
                              }/
                              {
                                   tasks.filter((task: any) => task.project_id === project.project_id).length
                              }
                              |
                              (
                                   {
                                        tasks.filter((task: any) => task.project_id === project.project_id)
                                        .map((task: any) => task.employee_id)
                                        .filter((employee_id: string, index: number, self: string[]) => self.indexOf(employee_id) === index).length
                                   }
                              )
                              {
                                   tasks.filter((task: any) => task.project_id === project.project_id)
                                        .map((task: any) => task.employee_id)
                                        .filter((employee_id: string, index: number, self: string[]) => self.indexOf(employee_id) === index)
                                        .map((employee_id: string) => employees.find((employee: EmployeeInterface) => employee.employee_id === employee_id)?.name)
                                        .join(', ')
                              }
                              |
                              {
                                   finances.filter((finance: any) => finance.project_id === project.project_id)
                                        .reduce((acc: number, finance: any) => acc + finance.amount, 0)
                              }
                         </li>
                    ))}
                    <li>
                         <Card>
                              <TextInput
                                   placeholder='Add a new project'
                                   value={newProject}
                                   onChange={(e) => setNewProject(e.target.value)} />
                              <Button onClick={addProject}>
                                   Add
                              </Button>
                         </Card>
                    </li>
               </ul>
          </div>
     )
}