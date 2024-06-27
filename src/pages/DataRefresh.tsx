import { Button } from 'flowbite-react';
import employees from '../data/EmployeeData.json';
import finances from '../data/FinanceData.json';
import projects from '../data/ProjectData.json';
import tasks from '../data/TaskData.json';
import { SetItem } from '../functions/ArrayData';

export const DataRefresh = () => {
    function saveData() {
        SetItem('employees', employees);
        SetItem('finances', finances);
        SetItem('projects', projects);
        SetItem('tasks', tasks);
    }

    return (
        <div>
            <Button onClick={saveData}>
                DataRefresh
            </Button>
        </div>
    )
}