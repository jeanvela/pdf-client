import style from '../styles/NotFound4040.module.css'
import { Link } from 'react-router-dom'

const NotFound404 = () => {
  return (
    <section className={style.not_found}>
        <div className={style.container}>
            <h1 className={style.h1}>404</h1>
            <h3 className={style.h3}>Page not found</h3>
            <Link to='/' className={style.link}>Back home</Link>
        </div>
    </section>
  )
}

export default NotFound404
