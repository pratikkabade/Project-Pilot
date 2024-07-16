import { useState } from 'react';
import { SetItem } from '../../functions/ArrayData';

// Assuming this component receives `projects` and `finances` as props
const FinanceRange = ({ projects, finances: initialFinances, totalExpenses }: { projects: any[], finances: any[], totalExpenses: number }) => {
    const [finances, setFinances] = useState(initialFinances);

    const handleRangeChange = (projectId: any, newValue: string) => {
        setFinances((currentFinances) => currentFinances.map(finance => {
            if (finance.project_id === projectId) {
                return { ...finance, amount: Number(newValue) };
            }
            return finance;
        }));
    };

    const saveFinances = () => {
        const saveFinanceElement = document.getElementById('save-finance');
        if (saveFinanceElement) {
            saveFinanceElement.innerHTML = 'Saved';
        }
        SetItem('finances', finances);
    };

    const sum = finances.reduce((acc, finance) => acc + finance.amount, 0);

    const difference = totalExpenses - sum;

    return (
        <>
            <h2 className='text-3xl font-semibold my-2 mb-4'>Total funds: {totalExpenses}</h2>

            {projects.map((project, index) => (
                <div key={index} className="flex flex-col">
                    <h3 className='text-2xl font-semibold'>{project.name} ({
                        finances.find(finance => finance.project_id === project.project_id)?.amount
                    })</h3>
                    <input
                        type="range"
                        min={0}
                        step={totalExpenses / 20}
                        max={totalExpenses -
                            finances.find(finance => finance.project_id === project.project_id)?.amount || 0
                        }
                        value={
                            finances.find(finance => finance.project_id === project.project_id)?.amount || 0
                        }
                        onChange={(e) => {
                            handleRangeChange(project.project_id, e.target.value);
                            const saveFinanceElement = document.getElementById('save-finance');
                            if (saveFinanceElement) {
                                saveFinanceElement.innerHTML = 'Save';
                            }
                        }}
                        className="range" />
                </div>
            ))}


            <h3 className='mt-5 text-2xl font-semibold'>Available funds: {difference}</h3>
            <input
                type="range"
                min={-totalExpenses}
                max={totalExpenses}
                value={difference}
                className={`range  ${difference < 0 ? 'range-error' : 'range-primary'}`}
                disabled />
            <button
                className="btn btn-primary mt-4"
                onClick={saveFinances}
                id='save-finance'
                disabled={difference !== 0}>
                Save
            </button>
        </>
    );
};

export default FinanceRange;