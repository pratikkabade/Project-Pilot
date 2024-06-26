import { Button, Card, TextInput } from 'flowbite-react';
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
     const percentageAvailableFunds = (amountLeft / totalAmount) * 100

     const employeesCount = employees.length
     const employeesAvailable = employees.filter((employee: EmployeeInterface) =>
          !tasks.map((task: any) => task.employee_id).includes(employee.employee_id)
     )
     const employeesWithCompletedTasks = employees.filter((employee: EmployeeInterface) =>
          tasks.filter((task: any) => task.employee_id === employee.employee_id && task.status === 'completed').length > 0
     )

     const tasksCount = tasks.length
     const completedTasks = tasks.filter((task: any) => task.status === 'completed').length
     const percentageTasksLeft = 100 - (completedTasks / tasksCount) * 100

     return (
          <div>
               <h1>PM</h1>
               <ul>
                    <li>
                         {totalAmount}
                         |
                         {totalOtherExpenses}
                         |
                         {amountLeft}
                         |
                         {percentageAvailableFunds.toFixed(2)}%
                    </li>
                    <li>
                         {employeesCount}
                         |
                         {employeesAvailable.map((employee: EmployeeInterface) => employee.name).join(', ')}
                         |
                         {employeesAvailable.length}
                         |
                         {employeesWithCompletedTasks.map((employee: EmployeeInterface) => employee.name).join(', ')}
                         |
                         {employeesWithCompletedTasks.length}
                    </li>
                    <li>
                         {tasksCount}
                         |
                         {completedTasks}
                         |
                         {percentageTasksLeft.toFixed(2)}%
                    </li>
               </ul>
               <ul>
                    {projects.map((project: ProjectInterface) => (
                         <li key={project.project_id} className='m-3'>
                              {project.name} |
                              {
                                   tasks.filter((task: any) => task.project_id === project.project_id && task.status === 'completed').length
                              }/
                              {
                                   tasks.filter((task: any) => task.project_id === project.project_id).length
                              } |
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
                              } |
                              {
                                   finances
                                        .filter((finance: any) => finance.project_id === project.project_id)
                                        .reduce((acc: number, finance: any) => acc + finance.amount, 0)
                              } |
                              {
                                   finances.
                                        filter((finance: any) => finance.project_id === project.project_id)?.
                                        reduce((acc: number, finance: any) => acc +
                                             finance.other_expenses.reduce((acc: number, other_expense: any) => acc +
                                                  other_expense.other_expenses_amount, 0), 0)
                              }
                         </li>
                    ))}
                    <li>
                         <Card>
                              <TextInput
                                   placeholder='Add a new project'
                                   value={newProject}
                                   onChange={(e) => setNewProject(e.target.value)}
                              />
                              <Button onClick={addProject}>Add</Button>
                         </Card>
                    </li>
               </ul>
          </div>
     );
}