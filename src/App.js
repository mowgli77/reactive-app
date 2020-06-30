import React from 'react';
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
import withSuspense, {withSuspenseDialogs} from "./HOC/withSuspense";
import ProfileContainer from "./components/Profile/ProfileContainer";
import NotFound from "./components/SystemComponents/NotFound";

const Login = React.lazy(() => import("./components/Login/Login"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));


class App extends React.Component {

    catchErrors = (PromiseRejectionEvent) => {
        alert(PromiseRejectionEvent.reason)
    }

    componentDidMount() {
        this.props.initalizedThunk();
        window.addEventListener('unhandledrejection', this.catchErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchErrors);
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app">
                <HeaderContainer/>
                <Navbar/>
                <div className={'app_content'}>
                    <Switch>
                        <Route exact path={'/'}
                               render={() => <Redirect to={'/profile'}/>}/>
                        <Route path={'/profile/:userId?'}
                               render={() => <ProfileContainer/>}/>
                        <Route /*exact*/ path={'/dialogs'}
                                         render={withSuspenseDialogs}/>
                        <Route path={'/news'} render={() => <News/>}/>
                        <Route path={'/music'} render={() => <Music/>}/>
                        <Route path={'/settings'} render={() => <Settings/>}/>
                        <Route path={'/users'} render={withSuspense(UsersContainer)}/>
                        <Route path={'/login'} render={withSuspense(Login)}/>
                        <Route path={'*'} render={() => <NotFound/>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
export default connect(mapStateToProps, {initalizedThunk})(App);
