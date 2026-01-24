import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {

  const {state} = useBudget()
  const isValidBudget = useMemo(()=> state.budget > 0 , [state.budget])
  
  useEffect(()=> {
    localStorage.setItem('budget', JSON.stringify(state.budget))
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state.expenses, state.budget])

  return (
    <>
      <header className="bg-blue-600 py-8">
        <h1 className="text-2xl md:text-3xl font-black text-white text-center uppercase">Planificador de Gastos</h1>
      </header>
      <div className="bg-white max-w-3xl mx-auto mt-8 p-10 shadow rounded-lg">
        {isValidBudget ? <BudgetTracker/> : <BudgetForm/>} 
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-8">
          <FilterByCategory/>
          <ExpenseList/>
          <ExpenseModal/>
        </main>
      )}
    </>
  )
}

export default App
