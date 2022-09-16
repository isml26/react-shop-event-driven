import { Fragment, useEffect } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { AppDispatch } from "../../store";
import { useSelector, useDispatch, } from "react-redux";
import { RootState } from "../../store";
import { currentUser } from "../../features/user/userSlice";
import axios from "axios";
import './navigation.styles.scss'

const Navigation = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { userInfo } = useSelector((state: RootState) => state.user);

    async function logoutUser() {
        await axios.post("http://localhost:3001/api/users/signout", {}, { withCredentials: true })
        dispatch(currentUser())
    }
    useEffect(() => {
        dispatch(currentUser())
    }, [])

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        userInfo ?
                        <span className='nav-link' onClick={logoutUser} >
                                SIGN OUT
                            </span>:
                            <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link> 
                    }

                </div>
            </div>
            <Outlet />;
        </Fragment>
    )
}

export default Navigation