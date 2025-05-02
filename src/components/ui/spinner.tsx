import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
	"inline-block animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
	{
		variants: {
			size: {
				default: "h-6 w-6",
				sm: "h-4 w-4",
				lg: "h-8 w-8",
			},
			variant: {
				default: "text-primary",
				secondary: "text-secondary",
				destructive: "text-destructive",
				muted: "text-muted-foreground",
			},
		},
		defaultVariants: {
			size: "default",
			variant: "default",
		},
	}
)

interface SpinnerProps
	extends React.HTMLAttributes<HTMLDivElement>,
	VariantProps<typeof spinnerVariants> {
	fullScreen?: boolean;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
	({ className, size, variant, fullScreen = false, ...props }, ref) => {
		const spinnerElement = (
			<div
				ref={ref}
				className={cn(spinnerVariants({ size, variant }), className)}
				role="status"
				aria-label="Loading"
				{...props}
			>
				<span className="sr-only">Loading...</span>
			</div>
		)

		if (fullScreen) {
			return (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
					{spinnerElement}
				</div>
			)
		}

		return spinnerElement
	}
)
Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }