import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    message:  '',
    error: {}
}

export const uploadPdf = createAsyncThunk('addPdf', async (pdf: File) => {
    try {
        const formData = new FormData()
        formData.append('myFile', pdf)
        const response = await axios.post('http://localhost:8080/api/file', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
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

const uploadPdfSlice = createSlice({
    name: 'addPdf',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(uploadPdf.fulfilled, (state, action) => {
            state.message = action.payload
        })
        builder.addCase(uploadPdf.rejected, (state, action) => {
            state.error = action.error
        })
    }
})

export default uploadPdfSlice.reducer