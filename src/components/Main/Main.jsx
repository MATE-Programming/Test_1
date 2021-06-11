import classes from './Main.module.scss'
import ReactRedux from '../../assets/image/RR2.jpg'
import {Statistic} from "antd";
import {requestUsers} from "../../redux/usersReducer";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMaxUsers} from "../../redux/usersSelectors";

const Main = (props) => {
    const dispatch = useDispatch()
    const maxUsers = useSelector(state => getMaxUsers(state))
    useEffect(() => {
        dispatch(requestUsers(1, 5))
    }, [])
    return (
        <div className={classes.mainContainer}>
            <div className={classes.one}>
                <h2>Что использовалось для создания сайта:</h2>
            </div>
            <div className={classes.two}>
                <h2>Что реализованно на сайте:</h2>
            </div>
            <div className={classes.three}>
                <div className={classes.three1}><img src={ReactRedux} alt="React + Redux"/></div>
                <div className={classes.three2}>
                    <p>Axios</p>
                    <p>Hooks</p>
                    <p>Thunk</p>
                    <p>Re-ducks</p>
                    <p>Formik</p>
                    <p>Ant Design</p>
                    <p>Grid Layout</p>
                </div>
            </div>
            <div className={classes.four}>
                <div className={classes.four1}>
                    <h3>REST API</h3>
                    <p>Получение пользователей и их профили</p>
                    <p>Авторизация</p>
                    <h3>Профиль</h3>
                    <p>Редактирование контактов/фото</p>
                    <p>Возможность смотреть профили пользователей будучи не авторизированным</p>
                </div>
                <div className={classes.four2}>
                    <h3>Формы</h3>
                    <p>Есть небольшая валидация форм</p>
                    <p>Обработка ошибок</p>
                    <p>У формы логина есть серверная капча</p>
                    <h3>User Interface</h3>
                    <p>Есть адаптивность</p>
                    <p>Дизайна нету =)</p>
                    <p>Есть прелоадер</p>
                    <p>Ant Design - Layout, Menu, Skeleton, Pagination, Upload, Modal, Button</p>
                </div>
            </div>
            <div className={classes.five}>
                <Statistic valueStyle={{fontSize: '40px'}} className={classes.maxUsers} title="Всего пользователей"
                           value={maxUsers}/>
            </div>
        </div>
    )
}

export default Main;
