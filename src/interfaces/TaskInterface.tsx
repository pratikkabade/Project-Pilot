interface TaskInterface {
    task_id: number;
    title: string;
    description: string;
    status: string;
    project_id: string;
    employee_id: string;
};

export default TaskInterface;

// "task_id": 1,
// "title": "Task 1",
// "description": "Description 1",
// "status": "in-progress",
// "project_id": "p1",
// "employee_id": "e1"
