import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"
import { Pressable, Text } from "react-native"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"bg-neutral-950 hover:bg-neutral-950/90 dark:bg-neutral-50 dark:hover:bg-neutral-50/90",
				destructive:
					"bg-red-500 hover:bg-red-500/90 dark:bg-red-900 dark:hover:bg-red-900/90",
				outline:
					"border border-neutral-200 bg-white hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800",
				secondary:
					"bg-neutral-100 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:hover:bg-neutral-800/80",
				ghost: "hover:bg-neutral-100 dark:hover:bg-neutral-800",
				link: "",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
		compoundVariants: [
			{
				size: "icon",
				class: "p-0",
			},
		],
	}
)

const buttonTextVariants = cva(
	"whitespace-nowrap text-sm font-medium transition-colors",
	{
		variants: {
			variant: {
				default: "text-neutral-50 dark:text-neutral-900",
				destructive: "text-neutral-50 dark:text-neutral-50",
				outline: "hover:text-neutral-900 dark:hover:text-neutral-50",
				secondary: "text-neutral-900 dark:text-neutral-50",
				ghost: "hover:text-neutral-900 dark:hover:text-neutral-50",
				link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

interface ButtonProps
	extends React.ComponentPropsWithoutRef<typeof Pressable>,
		VariantProps<typeof buttonVariants> {
	label?: string
	labelClasses?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ label, labelClasses, children, className, variant, size, ...props },
		_ref
	) => {
		return (
			<Pressable
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			>
				{label ? (
					<Text
						className={cn(
							buttonTextVariants({
								variant,
								className: labelClasses,
							})
						)}
					>
						{label}
					</Text>
				) : (
					children
				)}
			</Pressable>
		)
	}
)
Button.displayName = "Button"

export default Button
