import classes from './Preloader.module.scss'
import svg from '../../../assets/image/oval.svg'

const Preloader = () => {
    return (
        <div className={classes.preloader}>
            <img src={svg} alt=""/>
        </div>
    )
}

export default Preloader
