import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutThunk, reducerActions} from "../../redux/authReducer";
import {StateType} from "../../redux/reduxStore";

type MapStatePropsType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    burger: boolean
}

type MapDispatchPropsType = {
    logoutThunk: () => void
    setBurger: () => void
}

class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {
    componentDidMount() {

    }

    render() {
        return <Header {...this.props} />
    }
}

const setBurger = reducerActions.setBurger;

let mapStateToProps = (state: StateType) => {
    return {
        userId: state.auth.userId,
        login: state.auth.login,
        email: state.auth.email,
        isAuth: state.auth.isAuth,
        burger: state.auth.burger
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps, {logoutThunk, setBurger})(HeaderContainer);
