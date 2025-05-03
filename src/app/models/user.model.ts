import { User } from "@/features/profile/apis/profile.api-gen";

export const EMPTY_USER: User = {
	accountId: "",
	name: "",
	role: 1,
	phone: "",
	email: "",
	address: undefined,
	avatar: undefined,
	createdAt: new Date().toString(),
	updatedAt: new Date().toString(),
}

export enum UserRole {
	CLIENT = 1,
	CMS = 2,
}