import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {follow, requestUsersThunk, unfollow, usersActions} from "../../redux/usersReducer";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowProcessing,
    getIsFetchinge,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector,
} from "../../redux/usersSelector";
import {StateType} from "../../redux/reduxStore";
import {UsersType} from "../../types/types";
import withRedirect from "../../HOC/withRedirectComponent";


class UsersComponentContainer extends React.Component<UserContainerPropsType> {

    componentDidMount() {
        this.props.requestUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    onChangedPage = (currentPage: number): void => {
        this.props.requestUsersThunk(currentPage, this.props.pageSize);
    }

    render() {
        return <>
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   onChangedPage={this.onChangedPage}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   currentPage={this.props.currentPage}
                   followProcessing={this.props.followProcessing}
                   buttonDisable={this.props.buttonDisable}
                   isFetching={this.props.isFetching}
            />
        </>
    }
}


const mapStateToProps = (state: StateType) => {
    return {
        users: getUsersSelector(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetchinge(state),
        followProcessing: getFollowProcessing(state),
    }
}
const buttonDisable = usersActions.buttonDisable

export default compose<React.ComponentType>(
    withRedirect,
    connect<MapStateUsersContainerPropsType, MapDispatchUsersContainerPropsType, {}, StateType>
    (mapStateToProps, {
        follow,
        unfollow,
        buttonDisable,
        requestUsersThunk,
    })
)(UsersComponentContainer)

type MapStateUsersContainerPropsType = {
    users: UsersType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followProcessing: number[]
}
type MapDispatchUsersContainerPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    buttonDisable: (followProcessing: boolean, userId: number) => void
    requestUsersThunk: (currentPage: number, pageSize: number) => void
}
type UserContainerPropsType = MapStateUsersContainerPropsType & MapDispatchUsersContainerPropsType
