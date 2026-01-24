import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const {state} = useBudget()

    const isEmpty = useMemo(()=> state.expenses.length === 0, [state.expenses])

    return (
        <div className="mt-5">
            {isEmpty ? <p className="text-gray-600 text-xl font-bold">No hay gastos registrados</p>
            : (
                <>
                <p className="text-gray-600 text-xl font-bold my-5">Listado de gastos.</p>
                {state.expenses.map(expense => (
                    <ExpenseDetail  
                        key={expense.id}
                        expense={expense}
                    />
                ))}
                </>
            )}
        </div>
    )
}
