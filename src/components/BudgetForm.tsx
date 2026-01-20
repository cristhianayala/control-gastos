import { useMemo, useState, type ChangeEvent} from "react"
import { useBudget} from "../hooks/useBudget"

export default function BudgetForm() {

    const [budget, setBudget] = useState('')
    const {dispatch} = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const budgetValue = parseFloat(budget)
        dispatch({type: 'add-budget', payload: {budget: budgetValue}})
    }

    const isValid = useMemo(()=> {
        const budgetValue = parseFloat(budget)
        return !budget || isNaN(budgetValue) || budgetValue <= 0
    }, [budget])

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-3xl text-blue-600 font-bold text-center uppercase">Definir Presupuesto</label>
                <input
                    id="budget"
                    type="number"
                    className="w-full border border-gray-200 rounded-lg p-2"
                    placeholder="Define tu presupuesto: ej. 3000"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-blue-600 hover:bg-blue-700 w-full p-2 text-white font-bold uppercase rounded cursor-pointer disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    )
}
