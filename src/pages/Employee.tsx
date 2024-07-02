import { useEffect, useState } from "react";
import TaskInterface from "../interfaces/TaskInterface";
import EmployeeInterface from "../interfaces/EmployeeInterface";

export const Employee = () => {
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const employee_id = 'e2';

    useEffect(() => {
        const employees: EmployeeInterface[] = JSON.parse(localStorage.getItem('employees') || '[]');
        setEmployees(
            employees
                .filter(
                    (employee: EmployeeInterface) =>
                        employee.employee_id === employee_id
                ));
        const tasks: TaskInterface[] = JSON.parse(localStorage.getItem('tasks') || '[]');
        setTasks(tasks
            .filter(
                (task: TaskInterface) =>
                    task.employee_id === employee_id
            ));
    }, []);

    console.log(tasks);

    return (
        <div>
            <h1>Employee</h1>
            <ul>
                {employees.map((employee: EmployeeInterface) => (
                    <li key={employee.employee_id}>
                        {employee.name}
                    </li>
                ))}
            </ul>
            <h1>Tasks</h1>
            <ul>
                {tasks
                    .map((task: TaskInterface) => (
                        <div key={task.task_id} className='flex flex-col bg-emerald-50 m-3'>
                            {task.title} | {task.description} | {task.status}
                        </div>
                    ))}
            </ul>
        </div>
    );
};