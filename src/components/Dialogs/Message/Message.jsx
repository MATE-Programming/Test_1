import classes from './Message.module.scss'

const Message = (props) => {

    return (
        <div className={classes.message}>{props.message}</div>
    )
}

export default Message;
