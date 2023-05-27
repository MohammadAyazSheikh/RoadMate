import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'


export type userType = {
    userId: string | null,
    email: string | null,
    firstName: string | null,
    lastName: string | null,
    gender: "male" | "female",
    dob: Date | null,
    phoneNumber: string | null,
    profileImage: string | null
}

export type userState = {
    user: userType | null,
    isLoading: boolean,
    isLoadingSignup: boolean,
    errorMessage: string | null,
    updateUserLoading: boolean,
    errorUpdateUser: string | null
}



 const initialState: userState = {
    user: null,
    isLoading: false,
    isLoadingSignup: false,
    errorMessage: null,
    updateUserLoading: false,
    errorUpdateUser: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authSuccess: (state, action: PayloadAction<userType>) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isLoadingSignup = false;
            state.errorMessage = null;
            state.updateUserLoading = false;
            state.errorUpdateUser = null;
        },
        authError: (state, action: PayloadAction<string | null>) => {
            state.user = null;
            state.isLoading = false;
            state.isLoadingSignup = false;
            state.errorMessage = action.payload;
            state.updateUserLoading = false;
            state.errorUpdateUser = null;
        },
        authLoading: state => {
            state.user = null;
            state.isLoading = true;
            state.isLoadingSignup = false
            state.errorMessage = null;
            state.updateUserLoading = false;
            state.errorUpdateUser = null;
        },
        authLoadingSignUp: state => {
            state.user = null;
            state.isLoading = false;
            state.isLoadingSignup = true
            state.errorMessage = null;
            state.updateUserLoading = false;
            state.errorUpdateUser = null;
        },
        //update user
        updateUserSuccess: (state, action: PayloadAction<userType | null>) => {

            state.user = action.payload;
            state.isLoading = false;
            state.isLoadingSignup = false;
            state.errorMessage = null;
            state.updateUserLoading = false;
            state.errorUpdateUser = null;
        },
        updateUserError: (state, action: PayloadAction<string | null>) => {
            state.isLoading = false;
            state.isLoadingSignup = false;
            state.errorMessage = null;
            state.updateUserLoading = false;
            state.errorUpdateUser = action.payload;
        },
        updateUserLoading: (state) => {
            state.isLoading = false;
            state.isLoadingSignup = false;
            state.errorMessage = null;
            state.updateUserLoading = true;
            state.errorUpdateUser = null;
        },
    }
})

export default userSlice.reducer;

export const {
    authSuccess,
    authError,
    authLoading,
    authLoadingSignUp,
    updateUserError,
    updateUserLoading,
    updateUserSuccess
} = userSlice.actions;

