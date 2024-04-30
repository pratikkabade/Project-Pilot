import employees from '../data/EmployeeData.json';
import finances from '../data/FinanceData.json';
import projects from '../data/ProjectData.json';
import tasks from '../data/TaskData.json';
import userdata from '../data/UserData.json';
import { SetItem } from '../functions/ArrayData';

export const DataRefresh = () => {
    function saveData() {
        SetItem('employees', employees);
        SetItem('finances', finances);
        SetItem('projects', projects);
        SetItem('tasks', tasks);
        SetItem('all_user', userdata);
        alert('Data Refreshed');
    }

    return (
        <div className='flex flex-row justify-center align-middle items-center py-40 pt-60'>
            <button
            className='btn btn-primary'
            onClick={saveData}>
                DataRefresh
            </button>
        </div>
    )
}