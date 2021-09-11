import React from 'react';
import "antd/dist/antd.css";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Redirect, Route, Switch} from "react-router-dom";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import {initalizedThunk} from "./redux/appReducer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import Preloader from "./components/Preloader/Preloader";
import withSuspense from "./HOC/withSuspense";
import ProfileContainer from "./components/Profile/ProfileContainer";
import NotFound from "./components/SystemComponents/NotFound";
import {StateType} from "./redux/reduxStore";
import FriendsContainer from "./components/Friends/FriendsContainer";
import {Layout, Menu, Breadcrumb, Row, Col} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const Login = React.lazy(() => import("./components/Login/Login"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));

const SuspendedLogin = withSuspense(Login)
const SuspendedDialogsContainer = withSuspense(DialogsContainer)
const SuspendedUsersContainer = withSuspense(UsersContainer)
const SuspendedFriendsContainer = withSuspense(FriendsContainer)

class App extends React.Component<AppPropsType> {

    catchErrors = (e: PromiseRejectionEvent) => {
        alert(e.reason)
    }

    componentDidMount() {
        this.props.initalizedThunk();
        window.addEventListener('unhandledrejection', this.catchErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchErrors)
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <Layout>
                <HeaderContainer/>
                {/*<Header className="header">*/}
                {/*    <Row>*/}
                {/*        <Col span={2}>logo</Col>*/}
                {/*        <Col span={16}>col-16</Col>*/}
                {/*        <Col span={1}>col-1</Col>*/}
                {/*        <Col span={5}>col-5</Col>*/}
                {/*    </Row>*/}
                {/*</Header>*/}
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Navbar />
                        {/*<Menu*/}
                        {/*    mode="inline"*/}
                        {/*    defaultSelectedKeys={['1']}*/}
                        {/*    defaultOpenKeys={['sub1']}*/}
                        {/*    style={{height: '100%', borderRight: 0}}*/}
                        {/*>*/}
                        {/*        <Menu.Item key="1" icon={<LaptopOutlined/>}>option1</Menu.Item>*/}
                        {/*        <Menu.Item key="2">option2</Menu.Item>*/}
                        {/*        <Menu.Item key="3">option3</Menu.Item>*/}
                        {/*        <Menu.Item key="4">option4</Menu.Item>*/}
                        {/*</Menu>*/}
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route exact path={'/'}
                                       render={() => <Redirect to={'/profile'}/>}/>
                                <Route path={'/profile/:userId?'}
                                       render={() => <ProfileContainer/>}/>
                                <Route path={'/dialogs'}
                                       render={() => <SuspendedDialogsContainer/>}/>
                                <Route path={'/news'}
                                       render={() => <News/>}/>
                                <Route path={'/music'}
                                       render={() => <Music/>}/>
                                <Route path={'/settings'}
                                       render={() => <Settings/>}/>
                                <Route path={'/developers'}
                                       render={() => <SuspendedUsersContainer/>}/>
                                <Route path={'/friends'}
                                       render={() => <SuspendedFriendsContainer/>}/>
                                <Route path={'/login'}
                                       render={() => <SuspendedLogin/>}/>
                                <Route path={'*'}
                                       render={() => <NotFound/>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )


        // <div className="app">
        //     <HeaderContainer/>
        //     <Navbar/>
        //     <div className={'app_content'}>
        //         <Switch>
        //             <Route exact path={'/'}
        //                    render={() => <Redirect to={'/profile'}/>}/>
        //             <Route path={'/profile/:userId?'}
        //                    render={() => <ProfileContainer/>}/>
        //             <Route path={'/dialogs'}
        //                    render={() => <SuspendedDialogsContainer />}/>
        //             <Route path={'/news'}
        //                    render={() => <News/>}/>
        //             <Route path={'/music'}
        //                    render={() => <Music/>}/>
        //             <Route path={'/settings'}
        //                    render={() => <Settings/>}/>
        //             <Route path={'/users'}
        //                    render={() => <SuspendedUsersContainer />}/>
        //             <Route path={'/friends'}
        //                    render={() => <SuspendedFriendsContainer />}/>
        //             <Route path={'/login'}
        //                    render={() => <SuspendedLogin />}/>
        //             <Route path={'*'}
        //                    render={() => <NotFound/>}/>
        //         </Switch>
        //     </div>
        // </div>
    }
}

let mapStateToProps = (state: StateType) => ({
    initialized: state.app.initialized
})
type AppPropsType = ReturnType<typeof mapStateToProps> & {
    initalizedThunk: () => void
}

export default connect(mapStateToProps, {initalizedThunk})(App);
