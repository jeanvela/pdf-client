import { Link } from 'react-router-dom'
import style from '../styles/Navbar.module.css'
import userImg from '../assets/images/user.jpg'
import { useAppSelector } from '../redux/hook'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

interface Protected {
    setIsAuth: (bol: boolean) => void
}

const Navbar = ({ setIsAuth }: Protected): React.JSX.Element => {
    const dataUser = useAppSelector(state => state.verifyTok.user)
    const user = useAppSelector(state => state.login.user)
    const navigate = useNavigate()

    const logout =async () => {
        Cookies.remove('token')
        setIsAuth(false)
        return navigate('/')
    }

    return (
        <header className={style.header}>
            <nav>
                <ul className={style.ul}>
                    <li>
                        <Link to='/uploadpdf' className={style.li}>upload pdf</Link>
                    </li>
                    <li >
                        <Link to='/myPdfs' className={style.li}>My pdfs</Link>
                    </li>
                    <li>
                        <div className={style.contaiUser}>
                            <img src={userImg} alt="" width={30}/>
                            <span>{user.username || dataUser.username}</span>
                            <div className={style.contaiInfo}>
                                <button className={style.btn} type='submit' onClick={logout}>Logout</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
