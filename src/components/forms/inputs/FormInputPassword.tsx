import { useState } from "react";
import FormInput, { FormInputProps } from "./FormInput";
import { Eye, EyeOff } from "lucide-react";

export default function FormInputPassword(props: FormInputProps) {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<FormInput
			label={undefined}
			{...props}
			type={showPassword ? "text" : "password"}
			autoComplete={props.autoComplete}
			inputrelativechildren={
				<button
					type="button"
					className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-500 cursor-pointer"
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? (
						<Eye />
					) : (
						<EyeOff />
					)}
				</button>
			}
		/>
	);
}