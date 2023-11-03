import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, {AxiosError} from 'axios'

interface User {
    email: string
    password: string
}

interface Root {
    user: {
        _id: string | null
        username: string | null,
        email: string | null,
    },
    error: AxiosError | unknown
}

const initialState: Root = {
    user: {
        _id: '',
        username: '',
        email: ''
    },
    error: {}
}

let myError = {}

export const login = createAsyncThunk('login',async (user: User) => {
    try {
        const response = await axios.post('http://localhost:8080/api/sigin', user, {
            withCredentials: true,
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                "Content-Type": 'application/json'
            }
        })
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

const loginUpSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
            state.error = {}
        })
        builder.addCase(login.rejected, (state, action) => {
            action.error = myError
            state.error = action.error
        })
    },
})

export default loginUpSlice.reducer