import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

type PDF = {
    fielName: string
    filePathUrl: string
    public_id: string
    userId: string
}

interface Root {
    pdf: PDF[]
    error: {}
}

const initialState: Root = {
    pdf: [],
    error: {}
}

let myError = {}

export const allPdf = createAsyncThunk('pdf', async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/userpdfs', {
            withCredentials: true
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

const allPdfsSclice = createSlice({
    name: 'pdf',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(allPdf.fulfilled, (state, action) => {
            state.pdf = action.payload
            state.error = {}
        })
        builder.addCase(allPdf.rejected, (state, action) => {
            action.error = myError
            state.error = action.error
        })
    }
})

export default allPdfsSclice.reducer