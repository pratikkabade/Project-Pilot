import { GetItem } from "../functions/ArrayData";

export const FundingStatus = ({ item }: any) => {
    const finances = GetItem('finances');

    const otherExpensesOfProject = (project: any) => finances.
        filter((finance: any) => finance.project_id === project.project_id)?.
        reduce((acc: number, finance: any) => acc +
            finance.other_expenses.reduce((acc: number, other_expense: any) => acc +
                other_expense.other_expenses_amount, 0), 0)
    const maxExpensesOfProject = (project: any) => finances
        .filter((finance: any) => finance.project_id === project.project_id)
        .reduce((acc: number, finance: any) => acc + finance.amount, 0)

    return (
        <h3 className='text-xl font-normal flex flex-col'>
            <span>
                Funding Status:
                <span className={`ml-2 font-bold 
                                        ${(otherExpensesOfProject(item) / maxExpensesOfProject(item)) * 100 > 100 ? 'text-error' :
                        (otherExpensesOfProject(item) / maxExpensesOfProject(item)) * 100 === 100 ? 'text-accent' :
                            (otherExpensesOfProject(item) / maxExpensesOfProject(item)) * 100 > 80 ? 'text-warning' : 'text-success'}`}>
                    ({((otherExpensesOfProject(item) / maxExpensesOfProject(item)) * 100).toFixed(0)}%)
                </span>
            </span>
            <span className='font-bold'>
                {
                    otherExpensesOfProject(item) !== maxExpensesOfProject(item) ?
                        <>
                            <span className={`mr-1 
                    ${(otherExpensesOfProject(item) / maxExpensesOfProject(item)) * 100 > 100 ? 'text-error' :
                                    (otherExpensesOfProject(item) / maxExpensesOfProject(item)) * 100 === 100 ? 'text-accent' :
                                        (otherExpensesOfProject(item) / maxExpensesOfProject(item)) * 100 > 80 ? 'text-warning' : 'text-success'}`}>
                                {otherExpensesOfProject(item)}
                                <span className='ml-1'>utilized</span>
                            </span>
                            <span className='ml-1 text-2xl font-semibold'>
                                of {maxExpensesOfProject(item)}
                            </span>
                        </>
                        :
                        <span className="text-accent">Completely Utilized</span>
                }
            </span>
        </h3>
    )
}