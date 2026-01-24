import { useMemo } from "react"
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
  expense: Expense
}

export default function ExpenseDetail({expense} : ExpenseDetailProps) {

  const categoryInfo = useMemo(()=> categories.filter(cat => cat.id === expense.category), [expense])[0]
  const {dispatch} = useBudget()

  const leadingAction = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => dispatch({type: 'get-expense-by-id', payload:{id: expense.id}})}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingAction = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({type: 'remove-expense', payload:{id: expense.id} })}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )
  
  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingAction()}
        trailingActions={trailingAction()}
      >
        <div className="bg-white shadow p-10 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt="Icono gasto"
              className="w-20"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold uppercase text-slate-600">{categoryInfo.name}</p>
            <p className="">{expense.expenseName}</p>
            <p className="text-slate-600 tesxt-sm">{formatDate(expense.date!.toString())}</p>
          </div>
          <AmountDisplay
            amount={expense.amount}
          />
        </div>
      </SwipeableListItem>
    </SwipeableList>
   
  )
}
