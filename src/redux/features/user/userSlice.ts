import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'


export type userType = {
    uid: string | null,
    email: string | null,
    firstName: string | null,
    lastName: string | null,
    gender: boolean | null,
    dob: Date | null,
    phoneNumber: string | null,
}

export type userState = {
    user: userType | null,
    isLoading: boolean,
    errorMessage: string | null
}



const initialState: userState = {
    user: null,
    isLoading: false,
    errorMessage: null,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authSuccess: (state, action: PayloadAction<userType>) => {
            state.user = action.payload;
            state.isLoading = false;
            state.errorMessage = null
        },
        authError: (state, action: PayloadAction<string | null>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
        authLoading: state => {
            state.isLoading = true;
            state.errorMessage = null;
        },
    }
})

export default userSlice.reducer;
export const { authSuccess, authError, authLoading } = userSlice.actions;

