interface FinanceInterface {
        project_id: string;
        amount: number;
        other_expenses: {
            other_expenses_name: string;
            other_expenses_date: string;
            other_expenses_description: string;
            other_expenses_category: string;
            other_expenses_status: string;
            other_expenses_amount: number;
        }[];
};

export default FinanceInterface;
