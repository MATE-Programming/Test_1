import classes from './Login.module.scss'
import {Field, Form, Formik} from 'formik';
import People from '../../assets/image/people1.svg'
import {validateEmail, validateText} from "../FormControls/validation";
import {Redirect} from "react-router-dom";
import {getCaptcha, getCaptchaUrl, getErrorServer, getIsAuth} from "../../redux/usersSelectors";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/authReducer";
import {Button} from "antd";

const Login = (props) => {
    const isAuth = useSelector(state => getIsAuth(state))
    const errorServer = useSelector(state => getErrorServer(state))
    const isCaptcha = useSelector(state => getCaptcha(state))
    const captchaUrl = useSelector(state => getCaptchaUrl(state))
    const dispatch = useDispatch()

    if (isAuth) {
        return (
            <Redirect to='/profile'/>
        )
    }
    return (
        <div className={classes.loginPage}>
            <div>
                <img src={People} alt=""/>
            </div>
            <Formik
                initialValues={{
                    email: 'cekibo4051@gameqo.com',
                    password: '12345',
                    rememberMe: false,
                    captcha: '',
                }}
                onSubmit={async (values) => {
                    dispatch(login(values))
                }}
            >
                {({errors, touched, isValidating}) => (
                    <Form>
                        <div className={classes.loginForm}>
                            <h2>Авторизация</h2>
                            <div className={classes.field}>
                                <div className={classes.flex}>
                                    <label htmlFor="email">Email</label>
                                    <Field className={errors.email && touched.email && classes.errorField} id="email"
                                           name="email" placeholder="email@gmail.com"
                                           type="email" validate={validateEmail}/>
                                </div>
                                {errors.email && touched.email &&
                                <p className={classes.errorMessage}>{errors.email}</p>}
                            </div>

                            <div className={classes.field}>
                                <div className={classes.flex}>
                                    <label htmlFor="password">Пароль</label>
                                    <Field className={errors.password && touched.password && classes.errorField}
                                           id="password" validate={validateText} name="password" type="password"
                                           placeholder="Пароль"/>
                                </div>
                                {errors.password && touched.password &&
                                <p className={classes.errorMessage}>{errors.password}</p>}
                            </div>
                            {isCaptcha &&
                            <div className={classes.captcha}>
                                <img src={captchaUrl} alt="Введите капчу"/>
                                <Field className={errors.captcha && touched.captcha && classes.errorField}
                                       id="captcha" validate={validateText} name="captcha" placeholder="Введите капчу"/>
                            </div>
                            }
                            <label htmlFor="rememberMe">Запомнить меня?
                                <Field id="rememberMe" name="rememberMe" type="checkbox"/><br/>
                            </label>

                            {errorServer && <div className={classes.errorForm}>{errorServer}</div>}
                            <Button htmlType="submit">Войти</Button>
                            <br/>
                            Login: cekibo4051@gameqo.com
                            <br/>
                            Password: 12345
                            <br/>
                            <a target="_blank" rel="noreferrer"
                               href="https://social-network.samuraijs.com/signUp">Регистрация</a>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login;
