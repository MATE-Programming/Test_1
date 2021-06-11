import classes from './Dialogs.module.scss'
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";
import {Field, Form, Formik} from "formik";
import {validateText} from "../FormControls/validation";
import {useEffect} from "react";
import {Modal} from "antd";
import {compose} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {addMessages} from "../../redux/dialogsReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


const Dialogs = (props) => {
    const dialogsPage = useSelector(state => state.dialogsPage)
    let dialogElements = dialogsPage.dialogs
        .map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>) //Создание аватарки и имени

    let messageElements = dialogsPage.messages
        .map(message => <Message key={message.id} message={message.message} id={message.id}/>) //Создание сообщения

    const warning = () => {
        Modal.warning({
            title: 'Страница в разработке',
            content: 'Когда нибудь тут будет функциональная страница',
        });
    }
    useEffect(() => {
        warning()
    }, [])
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItem}>
                {dialogElements}
            </div>
            <div className={classes.messages}>
                {messageElements}
            </div>
            <DialogsForm {...props}/>
        </div>
    )
}

const DialogsForm = (props) => {
    const dispatch = useDispatch()
    return (
        <Formik
            initialValues={{
                message: '',
            }}
            onSubmit={async (values) => {
                dispatch(addMessages(values.message))
                values.message = ''
            }}
        >
            <Form>
                <Field id="message" name="message" placeholder="Введите сообщение..." validate={validateText}
                       component='textarea' type="text"/><br/>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default compose(
    withAuthRedirect //В папке hoc есть функция добавляет редирект
)(Dialogs)
