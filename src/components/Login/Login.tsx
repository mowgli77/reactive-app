import React from "react";
import {connect} from "react-redux";
import {AuthThunkType, LoginFormValuesType, loginThunk} from "../../redux/authReducer";
import {compose} from "redux";
import withRedirectToProfile from "../../HOC/withRedirectComponentToProfile";
import {LoginReduxForm} from "./LoginReduxForm";
import {StateType} from "../../redux/reduxStore";
import s from "./Login.module.css"


type MapStatePropsType = {
    captchaURL: string | null
}
type MapDispatchPropsType = {
    loginThunk: (values: LoginFormValuesType) => AuthThunkType
}

type LoginPropsType = MapStatePropsType & MapDispatchPropsType

const Login: React.FC<LoginPropsType> = (props) => {

    let loginning = (values: LoginFormValuesType) => {
        props.loginThunk(values);
    }
    return <div className={s.login}>
        <h2>Login</h2>
        <div>
            <LoginReduxForm onSubmit={loginning} captchaURL={props.captchaURL}/>
        </div>
    </div>
}

let mapStateToProps = (state: StateType) => ({
    captchaURL: state.auth.captchaURL
})

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps, {loginThunk}),
    withRedirectToProfile
)(Login);
