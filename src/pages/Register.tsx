import style from '../styles/Register.module.css'
import { useState, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { signUp } from '../redux/features/signUpSlice'
import { login } from '../redux/features/loginUpSlice'
import { useNavigate } from 'react-router-dom'

interface DataUser {
  username: string
  email: string
  password: string
}

interface Props {
  setIsAuth: (value: boolean) => void
}

const Register = ({setIsAuth}: Props): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isError = Object(useAppSelector(state => state.signUp.error))
  const [dataUser, setDataUser] = useState<DataUser>({
    username: '',
    email: '',
    password: ''
  })
  const hanldeChangue = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget
    setDataUser({...dataUser, [name]: value})
  }

  const submit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await dispatch(signUp(dataUser))
    if (response.meta.requestStatus === 'fulfilled') {
      dispatch(login({email: dataUser.email, password: dataUser.password}))
      setIsAuth(true)
      return navigate('/uploadpdf')
    } else {
      return
    }
  }

  return (
    <section className={style.register}>
      <div className={style.container}>
        <form className={style.form} onSubmit={submit}>
          {
            isError && Object.keys(isError).length > 0 ? (
              <div>
                <p>{isError.message}</p>
              </div>
            ) : (
              ''
            )
          }
          <h1 className={style.title}>Login</h1>
          <div className={style.contai_info}>
            <label htmlFor="" className={style.label}>Username</label>
            <input type="text" name='username' onChange={hanldeChangue} className={style.input}/>
          </div>
          <div className={style.contai_info}>
          <label htmlFor=""className={style.label}>Email</label>
            <input type="email" name='email' onChange={hanldeChangue} className={style.input}/>
          </div>
          <div className={style.contai_info}>
            <label htmlFor=""className={style.label}>Password</label>
            <input type="password" name='password' onChange={hanldeChangue} className={style.input}/>
          </div>
          <button className={style.btn}>Register</button>
        </form>
      </div>
    </section>
  )
}

export default Register
