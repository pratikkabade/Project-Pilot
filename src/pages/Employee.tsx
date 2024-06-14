import { useEffect, useState } from "react";
import TaskInterface from "../interfaces/TaskInterface";
import EmployeeInterface from "../interfaces/EmployeeInterface";
import StatusOptions from "../interfaces/StatusOptions";
import PageName from "../functions/PageName";
import { GetItem, SetItem } from "../functions/ArrayData";

export const Employee = () => {
    const [thisTasks, setThisTasks] = useState<TaskInterface[]>([]);
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const employee_id = GetItem('login_details').replace('/', '');

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
        <div className="p-5">
            <h1 className='text-5xl font-semibold'>Welcome back,
                {employees.map((employee: EmployeeInterface) => (
                    <span key={employee.employee_id} className="ml-2 font-bold">
                        {employee.name}
                    </span>
                ))}
            </h1>
            <h2 className=' mt-10 text-2xl font-semibold'>To-Dos</h2>
            <div className="flex flex-row flex-wrap">
                {
                    thisTasks
                        .filter((task: TaskInterface) => task.status !== 'completed').length !== 0 ?
                        thisTasks
                            .filter((task: TaskInterface) => task.status !== 'completed')
                            .map((task: TaskInterface) => (
                                <div key={task.task_id} className={`card flex flex-col m-3 
                        ${task.status === 'in-progress' ? 'bg-yellow-50 dark:bg-yellow-900' :
                                        task.status === 'pending' ? 'bg-red-50 dark:bg-red-950' : ''} 
                        `}>
                                    <h3 className='text-xl font-normal'>
                                        Task:
                                        <span className='font-bold ml-2'>{task.title}</span>
                                    </h3>
                                    <h3 className='text-xl font-normal'>
                                        Description:
                                        <span className='font-bold ml-2'>{task.description}</span>
                                    </h3>
                                    <h3 className='text-xl font-normal'>
                                        <select
                                            className='select select-bordered w-full'
                                            value={task.status}
                                            onChange={(e) => changeStatus(task.task_id, e.target.value)}
                                        >
                                            {StatusOptions.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </h3>
                                </div>
                            ))
                        :
                        <h3 className='text-xl font-normal p-5 text-emerald-700 dark:text-emerald-400'>All Done</h3>
                }
            </div>
            <div className="collapse bg-base-300 mt-10 p-5">
                <input type="checkbox" />
                <h2 className='collapse-title text-xl font-semibold'>Show Archived</h2>
                <div className="flex flex-row flex-wrap collapse-content">
                    {
                        thisTasks
                            .filter((task: TaskInterface) => task.status === 'completed').length !== 0 ?
                            thisTasks
                                .filter((task: TaskInterface) => task.status === 'completed')
                                .map((task: TaskInterface) => (
                                    <div key={task.task_id} className={`card m-3`}>
                                        <h3 className='text-xl font-normal'>
                                            Task:
                                            <span className='font-bold ml-2'>{task.title}</span>
                                        </h3>
                                        <h3 className='text-xl font-normal'>
                                            Description:
                                            <span className='font-bold ml-2'>{task.description}</span>
                                        </h3>
                                        <h3 className='text-xl font-normal'>
                                            <select
                                                className='select select-bordered w-full'
                                                value={task.status}
                                                onChange={(e) => changeStatus(task.task_id, e.target.value)}
                                            >
                                                {StatusOptions.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </h3>
                                    </div>
                                ))
                            :
                            <h3 className='text-xl font-normal p-5 text-red-700 dark:text-red-400'>Nothing's done yet</h3>
                    }
                </div>
            </div>
        </div>
    );
};