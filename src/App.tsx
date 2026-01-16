import BudgetForm from "./components/BudgetForm"

function App() {

  

  return (
    <>
      <header className="bg-blue-600 py-8">
        <h1 className="text-2xl md:text-3xl font-black text-white text-center uppercase">Planificador de Gastos</h1>
      </header>
      <div className="bg-white max-w-3xl mx-auto mt-8 p-10 shadow rounded-lg">
        <BudgetForm

        />
      </div>
    </>
  )
}

export default App
