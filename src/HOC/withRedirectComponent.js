import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({isAuth: state.auth.isAuth});

let withRedirect = (Component) => {

    class withRedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Component { ...this.props}/>
        }
    }
    let withConnectRedirectComponent = connect(mapStateToProps)(withRedirectComponent);
    return withConnectRedirectComponent;
}

export default withRedirect;
