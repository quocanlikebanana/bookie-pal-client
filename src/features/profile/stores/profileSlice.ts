import { createSlice } from '@reduxjs/toolkit';
import { PostLoginApiResponse, profileGenApi } from '../apis/profile.api-gen';
import { UserAuth } from '@/features/profile/apis/profile.api-gen';

export interface ProfileState {
	user: UserAuth | null;
	token: {
		accessToken: string;
		refreshToken: string;
	} | null;
	isVerified: boolean;
}

const initialState: ProfileState = {
	user: null,
	token: null,
	isVerified: false,
};

const profileSlice = createSlice({
	reducerPath: 'profile',
	name: 'profile',
	initialState,
	selectors: {
		selectIsVerified: (state: ProfileState) => state.isVerified,
		selectTokens: (state: ProfileState) => state.token,
		selectUser: (state: ProfileState) => state.user,
		selectIsAuthenticated: (state: ProfileState) => state.isVerified && state.token !== null && state.user !== null,
	},
	reducers: {
		logout: (state) => {
			_clearProfileState(state);
		}
	},
	extraReducers: (builder) => {
		// Login
		builder.addMatcher(profileGenApi.endpoints.postLogin.matchFulfilled, (state, action) => {
			_setProfileState(state, action.payload);
		});

		// Register
		builder.addMatcher(profileGenApi.endpoints.postRegister.matchFulfilled, (state, action) => {
			_setProfileState(state, action.payload);
		});

		// Logout
		builder.addMatcher((action) =>
			profileGenApi.endpoints.postLogout.matchFulfilled(action) || profileGenApi.endpoints.postLogout.matchRejected(action)
			, (state) => {
				_clearProfileState(state);
			}
		);

		// Refresh
		builder.addMatcher(profileGenApi.endpoints.postRefresh.matchFulfilled, (state, action) => {
			if (state.token) {
				state.token = action.payload.token;
				state.isVerified = true;
			}
		});
		builder.addMatcher(profileGenApi.endpoints.postRefresh.matchRejected, (state) => {
			_clearProfileState(state);
		});
	}
});

export const profileActions = profileSlice.actions;
export const profileSelectors = profileSlice.selectors;

export default profileSlice;

function _setProfileState(state: ProfileState, payload: PostLoginApiResponse) {
	state.isVerified = true;
	state.user = payload.user;
	state.token = payload.token;
}

function _clearProfileState(state: ProfileState) {
	state.isVerified = false;
	state.user = null;
	state.token = null;
}