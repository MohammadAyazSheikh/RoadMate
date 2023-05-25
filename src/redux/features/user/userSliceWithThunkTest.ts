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

//this thunk and 1st para is action type
// Generates pending, fulfilled and rejected action types
export const login = createAsyncThunk("user/login", () => {

    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},

    //extra reducer is used for adding thunk or
    // for changing state if other any reducer's action is dispatched 
    extraReducers: builder => {
        //addCase 1st param is action type

        //if loading
        builder.addCase(
            login.pending,
            state => {
                state.isLoading = true;
            })
        //if success
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<userType>) => {
                state.isLoading = false
                state.user = {
                    uid:"",
                    email:"",
                    firstName: "Ayaz",
                    lastName: "Sheikh",
                    gender: true,
                    dob: new Date(),
                    phoneNumber: null
                },
                    //action.payload
                    state.errorMessage = null
            }
        )
        //if failed
        builder.addCase(
            login.rejected,
            (state, action) => {
                state.isLoading = false
                state.errorMessage = action.error.message || "something went wrong"
            }
        )
    }

})

export default userSlice.reducer;

