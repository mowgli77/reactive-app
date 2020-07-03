import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {StateType} from "../redux/reduxStore";

let mapStateToProps = (state: StateType) => ({isAuth: state.auth.isAuth});
type MapStatePropsType = ReturnType<typeof mapStateToProps>

function withRedirectToProfile<P>(Component: React.ComponentType<P>){

    function withRedirectComponentToProfile(props: MapStatePropsType) {
        let {isAuth, ...restProps} = props
            return (isAuth ? <Redirect to={'/profile'}/> :
            <Component { ...restProps as P}/>)
    }
    const withConnectRedirectComponent = connect<MapStatePropsType, {}, P, StateType>(mapStateToProps)(withRedirectComponentToProfile);
    return withConnectRedirectComponent;
}

export default withRedirectToProfile;
