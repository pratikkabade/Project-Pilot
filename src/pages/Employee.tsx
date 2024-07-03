import { useEffect, useState } from "react";
import TaskInterface from "../interfaces/TaskInterface";
import EmployeeInterface from "../interfaces/EmployeeInterface";
import { Select } from "flowbite-react";
import StatusOptions from "../interfaces/StatusOptions";
import PageName from "../functions/PageName";
import { GetItem, SetItem } from "../functions/ArrayData";

export const Employee = () => {
    const [thisTasks, setThisTasks] = useState<TaskInterface[]>([]);
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const employee_id = 'e2';

    function getTasks() {
        const employees: EmployeeInterface[] = GetItem('employees');
        setEmployees(
            employees
                .filter(
                    (employee: EmployeeInterface) =>
                        employee.employee_id === employee_id
                ));
        const allTasks: TaskInterface[] = GetItem('tasks');
        setThisTasks(allTasks
            .filter(
                (task: TaskInterface) =>
                    task.employee_id === employee_id
            ));
        PageName('Employee');
    }

    useEffect(() => {
        getTasks();
    }, []);

    // function to change status
    const changeStatus = (task_id: number, status: string) => {
        const allTasks: TaskInterface[] = GetItem('tasks');
        const changedTaskIndex = allTasks.findIndex((task: TaskInterface) => task.task_id === task_id);
        allTasks[changedTaskIndex].status = status;
        setThisTasks(allTasks);
        SetItem('tasks', allTasks);
        getTasks();
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
                    thisTasks
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
                    thisTasks
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