import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    addAvatarThunk,
    getProfileThunk,
    getStatusThunk,
    updateProfileThunk,
    updateStatusThunk
} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import withRedirect from "../../HOC/withRedirectComponent";
import {compose} from "redux";
import {ProfileType} from "../../types/types";
import {StateType} from "../../redux/reduxStore";

type OwnProfileContainerPropsType = {
    history: string[]
    match: { params: { userId: number | null } }
}
type MapStateProfileContainerPropsType = {
    authUserId: number | null
    profile: ProfileType | null
    status: string
}
type MapDispatchProfileContainerPropsType = {
    getProfileThunk: (userId: number) => void
    getStatusThunk: (userId: number) => void
    updateStatusThunk: (status: string) => void
    addAvatarThunk: (avatarka: File | null) => void
    updateProfileThunk: (profile: ProfileType) => void
}
type ProfileContainerPropsType =
    OwnProfileContainerPropsType
    & MapStateProfileContainerPropsType
    & MapDispatchProfileContainerPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    profileRefresher() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        if (userId) {
            this.props.getProfileThunk(userId);
            this.props.getStatusThunk(userId);
        }
    }

    componentDidMount() {
        this.profileRefresher();

    }

    componentDidUpdate(prevProps: ProfileContainerPropsType, prevState: StateType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
            this.profileRefresher();
    }


    render() {
        return <Profile {...this.props} profile={this.props.profile} updateStatusThunk={this.props.updateStatusThunk}
                        status={this.props.status} addAvatarThunk={this.props.addAvatarThunk}
                        updateProfileThunk={this.props.updateProfileThunk}/>
    }
}

let mapStateToProps = (state: StateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.userId
});

export default compose(
    connect<MapStateProfileContainerPropsType, MapDispatchProfileContainerPropsType, OwnProfileContainerPropsType, StateType>
    (mapStateToProps, {getProfileThunk, getStatusThunk, updateStatusThunk, addAvatarThunk, updateProfileThunk}),
    withRouter,
    // withRedirect
)(ProfileContainer);
