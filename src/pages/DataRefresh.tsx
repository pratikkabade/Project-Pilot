import { Button } from 'flowbite-react';
import employees from '../data/EmployeeData.json';
import finances from '../data/FinanceData.json';
import projects from '../data/ProjectData.json';
import tasks from '../data/TaskData.json';

export const DataRefresh = () => {
    function saveData() {
        localStorage.setItem('employees', JSON.stringify(employees));
        localStorage.setItem('finances', JSON.stringify(finances));
        localStorage.setItem('projects', JSON.stringify(projects));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    return (
        <div>
            <Button onClick={saveData}>
                DataRefresh
            </Button>
        </div>
    )
}