import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface User {
    username: string,
    email: string,
    password: string
}

interface Root {
    user: string,
    error: AxiosError | unknown
}

const initialState: Root = {
    user: '',
    error: {}
}

let myError = {}

export const signUp = createAsyncThunk('signUp', async (user: User) => {
    try {
        const response  = await axios.post('http://localhost:8080/api/signup', user)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            myError = error.response?.data
            throw error.response?.data
        } else {
            throw error
        }
    }
})

const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload
            state.error = {}
        })
        builder.addCase(signUp.rejected, (state, action) => {
            action.error = myError
            state.error = action.error
        })
    }
})

export default signUpSlice.reducer