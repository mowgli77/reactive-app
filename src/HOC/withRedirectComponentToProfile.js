import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({isAuth: state.auth.isAuth});

let withRedirectToProfile = (Component) => {

    class withRedirectComponentToProfile extends React.Component {
        render() {
            return (this.props.isAuth ? <Redirect to={'/profile'}/> :
            <Component { ...this.props}/>) /*() after return is optional */

            // if (this.props.isAuth) return <Redirect to={'/profile'}/>
            // return <Component { ...this.props}/>
        }
    }
    let withConnectRedirectComponent = connect(mapStateToProps)(withRedirectComponentToProfile);
    return withConnectRedirectComponent;
}

export default withRedirectToProfile;
