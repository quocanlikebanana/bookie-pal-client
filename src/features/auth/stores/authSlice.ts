import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	user: {
		id: string;
		name: string;
		email: string;
		phone: string;
		avatar: string | null;
	} | null;
	token: {
		accessToken: string;
		refreshToken: string;
	} | null;
}

const initialState: AuthState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action: PayloadAction<{ user: AuthState['user']; token: AuthState['token'] }>) {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logout(state) {
			state.user = null;
			state.token = null;
		},
		updateUser(state, action: PayloadAction<AuthState['user']>) {
			if (state.user) {
				state.user = { ...state.user, ...action.payload };
			}
		},
	},
	selectors: {
		selectIsAuthenticated: (state: AuthState) => !!state.user && !!state.token,
		seleteUser: (state: AuthState) => state.user,
		selectToken: (state: AuthState) => state.token,
	},
});

export const authActions = authSlice.actions;
export const authSelectors = authSlice.selectors;

export default authSlice.reducer;