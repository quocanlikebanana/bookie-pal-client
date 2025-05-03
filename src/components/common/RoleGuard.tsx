import { ReactNode, useEffect } from 'react';
import { useAppSelector } from '@/app/store/hooks';
import { profileSelectors } from '@/features/profile/stores/profileSlice';
import { Role } from '@/features/profile/apis/profile.api-gen';
import { useNavigate } from 'react-router';
import { paths } from '@/routers/paths';

interface RouteGuardProps {
	children: ReactNode;
	requiredRole?: Role | Role[];
	redirectTo?: string;
}

const RoleGuard = ({
	children,
	requiredRole,
	redirectTo = paths.auth.LOGIN,
}: RouteGuardProps) => {
	const navigate = useNavigate();
	const isVerified = useAppSelector(profileSelectors.selectIsVerified);
	const user = useAppSelector(profileSelectors.selectUser);
	const tokens = useAppSelector(profileSelectors.selectTokens);

	useEffect(() => {
		if (user == null || tokens == null) {
			navigate(redirectTo);
			return;
		}
		if (isVerified == false) {
			return;
		}
		if (!requiredRole) return;
		if (Array.isArray(requiredRole)) {
			if (!requiredRole.includes(user.role)) {
				navigate(redirectTo);
				return;
			}
		} else if (user.role !== requiredRole) {
			navigate(redirectTo);
			return;
		}
	}, [isVerified, user, tokens, navigate, redirectTo, requiredRole]);

	return <>
		{children}
	</>
};

export default RoleGuard;