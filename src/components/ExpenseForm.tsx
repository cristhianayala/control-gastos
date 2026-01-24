import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
    
    const {dispatch, state, remainingBudget} = useBudget()

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)

    useEffect(()=> {
        if(state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])
    
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //validar todos los campos
        if(Object.values(expense).includes('') || expense.amount <= 0) {
            setError('Todos los campos son obligatorios')
            setTimeout(()=>{
                setError('')
            }, 1200)
            return
        }

        //validar que no se pase del límite
        if((expense.amount - previousAmount) > remainingBudget) {
            setError('El gasto supera el presupuesto')
            setTimeout(()=>{
                setError('')
            }, 1200)
            return
        }

        // Agregar/Actualizar gasto
        if(state.editingId) {
            dispatch({type: 'update-expense', payload:{expense: {id:state.editingId, ...expense}}})
        } else {
            dispatch({type: 'add-expense', payload:{expense}})
        }
        
        //reiniciar state
        setExpense({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
        })
        setPreviousAmount(0)
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-bold border-b-3 border-blue-600 pb-3"
            >{state.editingId ? 'Modificar Gasto' : 'Nuevo Gasto'}</legend>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >Nombre Gasto:</label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2 rounded-lg"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >Cantidad:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 500"
                    className="bg-slate-100 p-2 rounded-lg"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"
                >Categoría:</label>
                <select
                    id="category"
                    className="bg-slate-100 p-2 rounded-lg"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}>   
                    <option value="">--Seleccionar Categoría--</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >Fecha Gasto:</label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                value={state.editingId ? 'Guardar cambios' : 'Registrar gasto' }
                className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white font-bold uppercase cursor-pointer"
            />
        </form>
    )
}
