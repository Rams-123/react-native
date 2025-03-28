import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { TextInput } from "react-native"

const inputVariants = cva(
	"flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium text-slate-900 dark:text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-neutral-300"
)

export interface InputProps
	extends React.ComponentPropsWithoutRef<typeof TextInput> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, _ref) => {
		return (
			<TextInput className={cn(inputVariants(), className)} {...props} />
		)
	}
)

export default Input
