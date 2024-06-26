import { useEffect, useState } from "react";
import TaskInterface from "../interfaces/TaskInterface";
import EmployeeInterface from "../interfaces/EmployeeInterface";
import { Select } from "flowbite-react";
import StatusOptions from "../interfaces/StatusOptions";
import PageName from "../functions/PageName";
import { GetItem, SetItem } from "../functions/ArrayData";

export const Employee = () => {
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const employee_id = 'e2';

    useEffect(() => {
        const employees: EmployeeInterface[] = GetItem('employees');
        setEmployees(
            employees
                .filter(
                    (employee: EmployeeInterface) =>
                        employee.employee_id === employee_id
                ));
        const tasks: TaskInterface[] = GetItem('tasks');
        setTasks(tasks
            .filter(
                (task: TaskInterface) =>
                    task.employee_id === employee_id
            ));
        PageName('Employee');
    }, []);

    // function to change status
    const changeStatus = (task_id: number, status: string) => {
        const newTasks = tasks.map((task: TaskInterface) => {
            if (task.task_id === task_id) {
                task.status = status;
            }
            return task;
        });
        setTasks(newTasks);
        SetItem('tasks', newTasks);
    };

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
                {
                    tasks
                        .filter((task: TaskInterface) => task.status !== 'completed')
                        .map((task: TaskInterface) => (
                            <div key={task.task_id} className={`flex flex-col m-3 
                        ${task.status === 'in-progress' ? '' :
                                    task.status === 'pending' ? '' : ''} 
                        `}>
                                {task.title} | {task.description} | {task.status}
                                <Select
                                    className='w-1/4'
                                    value={task.status}
                                    onChange={(e) => changeStatus(task.task_id, e.target.value)}
                                >
                                    {StatusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        ))
                }
                {
                    tasks
                        .filter((task: TaskInterface) => task.status === 'completed')
                        .map((task: TaskInterface) => (
                            <div key={task.task_id} className='flex flex-col m-3 '>
                                {task.title} | {task.description} | {task.status}
                                <Select
                                    className='w-1/4'
                                    value={task.status}
                                    onChange={(e) => changeStatus(task.task_id, e.target.value)}
                                >
                                    {StatusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        ))
                }
            </ul>
        </div>
    );
};