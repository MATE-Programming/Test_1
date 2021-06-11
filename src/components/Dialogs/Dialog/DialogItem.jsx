import classes from './DialogItem.module.scss'
import {NavLink} from "react-router-dom";
import UserPhoto from "../../../assets/image/UserPhoto.png"

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id

    return (
        <div className={classes.dialog}>
            <NavLink to={path}><img src={UserPhoto} alt="avatar"/><p>{props.name}</p></NavLink>
        </div>
    )
}

export default DialogItem;
