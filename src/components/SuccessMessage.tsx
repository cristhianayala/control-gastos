import type { ReactNode } from "react"

type SuccessMessageProps = {
    children: ReactNode
}

export default function SuccessMessage({children} : SuccessMessageProps) {
  return (
    <p className="bg-green-500 p-2 font-bold text-center text-white"
    >{children}</p>
  )
}
