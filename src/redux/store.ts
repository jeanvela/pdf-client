import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import loginUpSlice from './features/loginUpSlice'
import signUpSlice from './features/signUpSlice'
import verifyTokenSlice from './features/verifyTokenSlice'
import allPdfsSclice from './features/allPdfsSclice'
import uploadPdfSlice from './features/uploadPdfSlice'

export const store = configureStore({
    reducer: {
        login: loginUpSlice,
        signUp: signUpSlice,
        verifyTok: verifyTokenSlice,
        pdf: allPdfsSclice,
        createPdf: uploadPdfSlice
    }
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch