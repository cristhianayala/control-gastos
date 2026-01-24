import type { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {

    const {dispatch} = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'get-filter-category-id', payload: {id: e.target.value}})
    }

    return (
        <div className="bg-white shadow-md px-10 py-5">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category"
                    >Filtrar Categoria.-</label>
                    <select
                        id="category"
                        className="bg-slate-100 p-1 flex-1 rounded-md"
                        onChange={handleChange}
                    >
                        <option value="">-- Todas las categorias --</option>
                        {categories.map(category => (
                            <option
                                value={category.id}
                                key={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}
