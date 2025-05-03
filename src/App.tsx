import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./app/store/hooks";
import { profileActions, profileSelectors } from "./features/profile/stores/profileSlice";
import Router from "./routers/Router";
import { usePostRefreshMutation } from "./features/profile/apis/profile.api-gen";
import "./app/css/CollapsibleContent.css";

function App() {
	const isVerified = useAppSelector(profileSelectors.selectIsVerified);
	const tokens = useAppSelector(profileSelectors.selectTokens);
	const user = useAppSelector(profileSelectors.selectUser);
	const dispatch = useAppDispatch();
	const isMounted = useRef(false);

	const [refresh] = usePostRefreshMutation();
	useEffect(() => {
		if (tokens == null || user == null) {
			dispatch(profileActions.logout());
		}
		else if (isVerified == false && isMounted.current == false) {
			isMounted.current = true;
			refresh({
				body: {
					refreshToken: tokens.refreshToken,
				}
			});
		}
	}, [isVerified, tokens, user, dispatch, refresh]);

	return <>
		<Router />
	</>;
}

export default App;