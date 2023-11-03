import  { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

const initialState = {
    user: {
        _id: '',
        username: '',
        email: ''
    },
    error: {}
}

export const verifyToken = createAsyncThunk('verifyToken',async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/verify', {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data
        } else {
            throw error
        }
    }
})

const verifyTokenSlice = createSlice({
    name: 'verifyToken',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(verifyToken.fulfilled, (state, action) => {
            state.user = action.payload
            state.error = {}
        })
        builder.addCase(verifyToken.rejected, (state, action) => {
            state.error = action.error
        })
    }
})

export default verifyTokenSlice.reducer