import { paths } from '@/routers/paths';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { usePostLoginMutation } from '@/features/profile/apis/profile.api-gen';
import { parseBaseQueryError } from '@/app/query/parseFetchBaseQueryError';
import { LoginSchema, loginSchema } from '@/features/profile/types/schema';
import FormInput from '@/components/forms/inputs/FormInput';
import FormInputPassword from '@/components/forms/inputs/FormInputPassword';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { TriangleAlert } from "lucide-react"

export default function AuthLoginPage() {
	const navigate = useNavigate();
	const methods = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		mode: "onSubmit",
	});
	const [login, { isSuccess, isLoading, error: queryError }] = usePostLoginMutation();

	useEffect(() => {
		if (isSuccess) {
			navigate(paths.ROOT);
		}
	}, [isSuccess, navigate]);

	const { handleSubmit } = methods;

	const handleSignUpButtonClick = () => {
		navigate(paths.auth.REGISTER);
	};

	const onSubmit = (data: LoginSchema) => {
		login({ body: data });
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
				<div className='mt-2 mb-6'>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
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
								id='email'
								label='Email address'
								placeholder='Email address'
							/>
							<FormInputPassword
								id='password'
								label='Password'
								placeholder='Password'
								autoComplete='current-password'
							/>
						</div>

						<div className='my-2'>
							<a
								href="#"
								className="mb-2 text-sm font-medium text-blue-600 hover:text-blue-500">
								Forgot your password?
							</a>
						</div>

						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
						>
							Sign in
						</button>
					</form>
				</FormProvider>

				<div className="flex items-baseline justify-center gap-x-1 mt-4 text-sm text-gray-600">
					<span>Don't have an account?</span>
					<button
						type="button"
						onClick={handleSignUpButtonClick}
						className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
					>
						Sign up
					</button>
				</div>

				<div className="mt-4">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">
								Or continue with
							</span>
						</div>
					</div>

					<div className="mt-6 w-full">
						<button
							type="button"
							className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
						>
							<GoogleIcon />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
