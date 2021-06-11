import 'antd/dist/antd.css';
import './App.scss';
import './media.scss';
import Settings from "./components/Settings/Settings";
import Profile from "./components/Profile/Profile";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import HeaderApp from "./components/Header/HeaderApp";
import Login from "./components/Login/Login";
import Preloader from "./components/common/Preloader/Preloader";
import {Route, Switch} from "react-router-dom";
import React, {Suspense, useEffect} from "react";
import {Layout} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {initializeApp, setOpenMenu} from "./redux/appReducer";
import {useMediaQuery} from 'react-responsive'
import Users from "./components/Users/Users";

let classNames = require('classnames');

const {Content, Footer, Sider} = Layout;
const DialogsContainer = React.lazy(() => import("./components/Dialogs/Dialogs"));
const NotFound = React.lazy(() => import("./components/common/404/NotFound"));

let App = (props) => {
    const dispatch = useDispatch()
    const isTablet = useMediaQuery({query: '(max-width: 1200px)'})
    const isOpenMenu = useSelector(state => state.app.isOpenMenu)
    const initialized = useSelector(state => state.app.initialized)
    const isOpened = useSelector(state => state.app.isOpenMenu)
    useEffect(() => {
        dispatch(initializeApp())
        if (isTablet) {
            dispatch(setOpenMenu(false))
        }
    }, [])
    let view = () => {
        if (isOpenMenu && !isTablet) {
            return 'showMenu'
        } else if (!isOpenMenu && !isTablet) {
            return 'showMenu'
        } else if (!isOpenMenu && isTablet) {
            return 'hideMenu'
        } else if (isOpenMenu && isTablet) {
            return 'showMenu'
        }
    }
    let overlay = () => {
        if (view() === 'showMenu') {
            return 'show'
        }
    }
    let sidebarClass = classNames({
        show: overlay(),
        'overlay': 'overlay',
    });
    let removeOverlay = (e) => {
        if (e.currentTarget) {
            e.currentTarget.classList.remove('show')
            if (isOpened) {
                dispatch(setOpenMenu(false))
            }
        } else {
            return null
        }
    }
    if (!initialized) {
        return <Preloader/>
    }
    return (
        <Layout style={{position: 'relative'}}>
            <Sider
                className={view()}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    background: '#fff',
                    zIndex: 555
                }}
            >
                <Sidebar/>
            </Sider>
            <Layout className={'site-layout'}>
                <div className={sidebarClass} onClick={removeOverlay}></div>
                <HeaderApp className="site-layout-background header" style={{padding: 0}}/>
                <Content style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280
                }}>
                    <div className="site-layout-background" style={{padding: 24}}>
                        <Suspense fallback={<Preloader/>}>
                            <Switch>
                                <Route path="//" render={() => <Main/>}/>
                                <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                                <Route path="/users" render={() => <Users/>}/>
                                <Route path="/profile/:userId?" render={() => <Profile/>}/>
                                <Route path="/login" render={() => <Login/>}/>
                                <Route path="/settings" component={Settings}/>
                                <Route path="*" component={NotFound}/>
                            </Switch>
                        </Suspense>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Created by
                    <a href="https://t.me/SKaterinenko"> SKaterinenko</a>
                </Footer>
            </Layout>
        </Layout>
    );
}

export default App
