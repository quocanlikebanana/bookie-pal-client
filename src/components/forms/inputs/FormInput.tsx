import { useFormContext } from "react-hook-form";

export type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	id: string;
	placeholder: string;
	label?: string;
	inputrelativechildren?: React.ReactNode;
};

export default function FormInput({ ...props }: FormInputProps) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const { id, label, placeholder } = props;
	const errorMessage = errors[id as keyof typeof errors]?.message;
	return (
		<div>
			{label && (
				<label
					htmlFor={id}
					className="block mb-1 text-sm font-medium text-gray-700"
				>
					{label}
				</label>
			)}
			<div className='relative'>
				<input
					{...props}
					id={props.id}
					className={`appearance-none shadow-sm w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${errorMessage
						? 'border-red-500'
						: ''} ${props.className}`}
					placeholder={placeholder}
					{...register(id)}
				/>
				{props.inputrelativechildren}
			</div>
			{errorMessage && <span className='text-sm text-red-500'>{errorMessage.toString()}</span>}
		</div>
	);
}
