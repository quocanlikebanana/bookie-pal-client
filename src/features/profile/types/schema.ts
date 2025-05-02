import { z } from "zod";

const phoneSchema = z
	.string()
	.trim()
	.regex(/^\+\d[\d\s]{9,14}$/, {
		message: "Phone number must be in E.164 format (e.g., +123 456 7890)",
	})
	.nonempty("Phone number is required")
	.refine((val) => val.replace(/\s/g, "").length >= 11 && val.replace(/\s/g, "").length <= 16, {
		message: "Phone number must have 10–15 digits after the '+'",
	});

export const loginSchema = z.object({
	email: z
		.string()
		.email('Invalid email address')
		.nonempty('Email is required'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(/[a-zA-Z]/, 'Password must contain at least one letter')
		.nonempty('Password is required'),
});

export const registerSchema = loginSchema.extend({
	name: z.string()
		.nonempty("Name is required"),
	confirmPassword: z.string()
		.nonempty("Confirm Password is required"),
	phone: phoneSchema,
}).refine(data => {
	console.log("Checking passwords", data.password, data.confirmPassword);
	return data.password === data.confirmPassword
}, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;