import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRouter from './components/ProtectedRouter'
import { useState, useEffect } from 'react'
import NotFound404 from './pages/NotFound404'
import CreatePdf from './pages/CreatePdf'
import RouterBasic from './components/RouterBasic'
import MyPdf from './pages/MyPdf'
import Cookies from 'js-cookie'
import { useAppDispatch } from './redux/hook'
import { verifyToken } from './redux/features/verifyTokenSlice'

function App() {
  const dispatch = useAppDispatch()
  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    const userToken = Cookies.get()
    if (userToken.token) {
      setIsAuth(true)
      dispatch(verifyToken())
    } else {
      setIsAuth(false)
    }
  }, [dispatch, isAuth])

  return (
      <Routes>
        <Route element={<RouterBasic isAuth={isAuth}/>}>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>
          <Route path='/register' element={<Register setIsAuth={setIsAuth}/>}/>
        </Route>
        <Route element={<ProtectedRouter isAuth={isAuth} setIsAuth={setIsAuth}/>}>
          <Route path='/uploadpdf' element={<CreatePdf />}/>
          <Route path='/myPdfs' element={<MyPdf />}/>
        </Route>
        <Route path='*' element={<NotFound404 />}></Route>
      </Routes>
  )
}

export default App
