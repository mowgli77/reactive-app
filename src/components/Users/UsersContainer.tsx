import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    buttonDisable, ButtonDisableActionType,
    follow, requestUsersThunk,
    unfollow, UsersThunkTypes
} from "../../redux/usersReducer";
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


type MapStateUsersContainerPropsType = {
    users: UsersType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followProcessing: number[]
}
type MapDispatchUsersContainerPropsType = {
    follow: (userId: number) => UsersThunkTypes
    unfollow: (userId: number) => UsersThunkTypes
    buttonDisable: (followProcessing: boolean, userId: number) => ButtonDisableActionType
    requestUsersThunk: (currentPage: number, pageSize: number) => UsersThunkTypes
}
type UserContainerPropsType = MapStateUsersContainerPropsType & MapDispatchUsersContainerPropsType

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

export default compose(
    connect<MapStateUsersContainerPropsType, MapDispatchUsersContainerPropsType, {}, StateType>
    (mapStateToProps, {
        follow,
        unfollow,
        buttonDisable,
        requestUsersThunk,
    })
//@ts-ignore
)(UsersComponentContainer)