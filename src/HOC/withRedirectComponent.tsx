import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {StateType} from "../redux/reduxStore";

let mapStateToProps = (state: StateType) => ({
    isAuth: state.auth.isAuth
})
type MapStatePropsType = ReturnType<typeof mapStateToProps>

function withRedirect<P>(Component: React.ComponentType<P>) {

    function withRedirectComponent(props: MapStatePropsType) {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as P} />
    }

    let withConnectRedirectComponent = connect<MapStatePropsType, {}, P, StateType>
    (mapStateToProps)(withRedirectComponent);
    return withConnectRedirectComponent;
}

export default withRedirect;
