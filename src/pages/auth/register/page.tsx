import { paths } from '@/routers/paths';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { RegisterSchema, registerSchema } from '@/features/profile/types/schema';
import { usePostRegisterMutation } from '@/features/profile/apis/profile.api-gen';
import { parseBaseQueryError } from '@/app/query/parseFetchBaseQueryError';
import FormInput from '@/components/forms/inputs/FormInput';
import FormInputPassword from '@/components/forms/inputs/FormInputPassword';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TriangleAlert } from 'lucide-react';

export default function AuthRegisterPage() {
	const navigate = useNavigate();
	const methods = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		mode: "onSubmit",
	});

	const [postRegister, { isSuccess, isLoading, error: queryError }] = usePostRegisterMutation();

	useEffect(() => {
		if (isSuccess) {
			navigate(paths.ROOT);
		}
	}, [isSuccess, navigate]);

	const { handleSubmit } = methods;
	const onSubmit = (data: RegisterSchema) => {
		const { confirmPassword, ...rest } = data;
		postRegister({ body: rest });
	};

	const handleSignInButtonClick = () => {
		navigate(paths.auth.LOGIN);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
				<div className='mt-2 mb-6'>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Create new account
					</h2>
				</div>

				{isLoading && <div className="flex justify-center my-4"><Spinner /></div>}
				{queryError && (
					<Alert variant="destructive" className="mb-4">
						<TriangleAlert className="h-4 w-4" />
						<AlertDescription>
							{parseBaseQueryError(queryError).message}
						</AlertDescription>
					</Alert>
				)}

				<FormProvider {...methods}>
					<form
						className="mt-8 space-y-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="flex flex-col gap-y-4">
							<FormInput
								id="name"
								label='Full name'
								placeholder="Full name"
								autoComplete="name"
							/>

							<FormInput
								id="email"
								label='Email'
								placeholder="Email"
								autoComplete="email"
							/>

							<FormInput
								id="phone"
								label='Phone'
								placeholder="Phone"
								autoComplete="tel"
							/>

							<FormInputPassword
								id='password'
								label='Password'
								placeholder='Password'
								autoComplete='new-password'
							/>

							<FormInputPassword
								id='confirmPassword'
								label='Confirm password'
								placeholder='Confirm password'
							/>
						</div>

						<button
							type="submit"
							className="group relative mt-10 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
						>
							Sign up
						</button>
					</form>
				</FormProvider>

				<div className="flex items-baseline justify-center gap-x-1 mt-4 text-sm text-gray-600">
					<span>Already have an account?</span>
					<button
						type="button"
						onClick={handleSignInButtonClick}
						className="font-medium text-blue-600 hover:text-blue-500"
					>
						Sign in
					</button>
				</div>
			</div>
		</div>
	);
}