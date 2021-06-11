import {Button, Result} from "antd";
import {Link} from "react-router-dom";

const NotFound = (props) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="К сожалению, посещенная вами страница не существует."
            extra={<Link to='/'><Button type="primary">Вернутся домой</Button></Link>}
        />
    )
}

export default NotFound;
