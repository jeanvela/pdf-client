import style from '../styles/Home.module.css'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <main className={style.main}>
            <h1 className={style.title}>Welcome</h1>
            <section className={style.home}>
                <Link to='/login' className={style.link}>
                    SignIn
                </Link>
                <Link to='/register' className={style.link}>
                    SignUp
                </Link>
            </section>
        </main>
    )
}

export default Home
