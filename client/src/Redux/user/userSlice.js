import { createSlice } from "@reduxjs/toolkit";

// initialstate is a object with initial values or variables
const initialState = {
    currentUser: null,
    error: false,
    loading: false,
}

// userSlice = createSlice( { name:'user' , initialState , reducers : {} } )
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        updateUserStart: (state, action) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        deleteUserStart: (state, action) => {
            state.loading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutStart: (state) => {
            state.loading = true;
        },
        signOutSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },


    }
})

export const {
    signInStart,
    signInSuccess,
    signInFailed,
    updateUserStart,
    updateUserSuccess,
    updateUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,
    signOutStart,
    signOutSuccess,
    signOutFailed,
} = userSlice.actions;
export default userSlice.reducer;  // jisko default me export krte hain uska name change kr skte hain jahan import krte hain