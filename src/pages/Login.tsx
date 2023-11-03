import style from '../styles/Login.module.css'
import { useState, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/features/loginUpSlice'

interface LoginUser {
  email: string
  password: string
}

interface Props {
  setIsAuth: (value: boolean) => void
}

const Login = ({setIsAuth}: Props): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isError = useAppSelector(state => state.login.error)

  const [infoLogin, setInfoLogin] = useState<LoginUser>({
    email: '',
    password: ''
  })

  const hanldeChangue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    setInfoLogin({...infoLogin, [name]: value})
  }
  
  const submit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await dispatch(login(infoLogin))
    if (response.meta.requestStatus === 'rejected') {
      return
    } else {
      setIsAuth(true)
      return navigate('/uploadpdf')
    }
  }

  return (
    <section className={style.login}>
      <div className={style.container}>
        <form className={style.form} onSubmit={submit}>
          {
            isError && Object.keys(isError).length > 0 ? (
              <div>
                <p>{Object.values(isError)}</p>
              </div>
            ) : (
              ''
            )
          }
          <h1 className={style.title}>Login</h1>
          <div className={style.contai_info}>
            <label htmlFor="" className={style.label}>Email</label>
            <input type="email" name='email' onChange={hanldeChangue} className={style.input}/>
          </div>
          <div className={style.contai_info}>
            <label htmlFor=""className={style.label}>Password</label>
            <input type="password" name='password' onChange={hanldeChangue} className={style.input}/>
          </div>
          <button className={style.btn}>Login</button>
        </form>
      </div>
    </section>
  )
}

export default Login
