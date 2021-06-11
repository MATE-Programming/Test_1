import classes from './Header.module.scss'
import {Link} from "react-router-dom";
import {Button, Layout} from 'antd';
import {getIsAuth, getLogin} from "../../redux/usersSelectors";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/authReducer";
import {MenuOutlined} from "@ant-design/icons";
import {setOpenMenu} from "../../redux/appReducer";

const {Header} = Layout;

const HeaderApp = (props) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => getIsAuth(state))
    const login = useSelector(state => getLogin(state))
    return (
        <Header className="site-layout-background" style={{padding: 0}}>
            <div className={classes.auth}>
                <div className={classes.burgerMenu} onClick={() => {
                    dispatch(setOpenMenu(true))
                }}>
                    <MenuOutlined/>
                </div>
                {isAuth
                    ? <div className={classes.login}>
                        <h3>{login}</h3>
                        <Button className={classes.buttons} onClick={() => {
                            dispatch(logout())
                        }}>Выйти</Button></div>
                    : <Link to='/login'><Button className={classes.buttons}>Войти</Button></Link>}
            </div>
        </Header>
    )
}

export default HeaderApp;
