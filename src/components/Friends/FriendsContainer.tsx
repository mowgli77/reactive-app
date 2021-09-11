import React, {useEffect} from "react";
import Users from "../Users/Users";
import {useDispatch, useSelector} from "react-redux";
import {requestUsersThunk} from "../../redux/usersReducer";
import {getCurrentPage, getPageSize,} from "../../redux/usersSelector";

const FriendsContainer = () => {

    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsersThunk(currentPage, pageSize, {term: '', friend: true}))
    })
    return <>
        <Users />
    </>
}

export default FriendsContainer

//
// class FriendsComponentContainer extends React.Component<UserContainerPropsType> {
//
//     componentDidMount() {
//         this.props.requestUsersThunk(this.props.currentPage, this.props.pageSize, {term: '', friend: true});
//     }
//
//     onChangedPage = (currentPage: number): void => {
//         this.props.requestUsersThunk(currentPage, this.props.pageSize, {term: '', friend: true});
//     }
//     onChangedFilter = (filter: FilterType): void => {
//         this.props.requestUsersThunk(1, this.props.pageSize, filter);
//     }
//
//     render() {
//         return <>
//             <Users totalUsersCount={this.props.totalUsersCount}
//                    pageSize={this.props.pageSize}
//                    onChangedPage={this.onChangedPage}
//                    users={this.props.users}
//                    follow={this.props.follow}
//                    unfollow={this.props.unfollow}
//                    currentPage={this.props.currentPage}
//                    followProcessing={this.props.followProcessing}
//                    buttonDisable={this.props.buttonDisable}
//                    isFetching={this.props.isFetching}
//                    onChangedFilter={this.onChangedFilter}
//             />
//         </>
//     }
// }
//
//
// const mapStateToProps = (state: StateType) => {
//     return {
//         users: getUsersSelector(state),
//         totalUsersCount: getTotalUsersCount(state),
//         pageSize: getPageSize(state),
//         currentPage: getCurrentPage(state),
//         isFetching: getIsFetchinge(state),
//         followProcessing: getFollowProcessing(state),
//     }
// }
// const buttonDisable = usersActions.buttonDisable
//
// export default compose<React.ComponentType>(
//     withRedirect,
//     connect<MapStateUsersContainerPropsType, MapDispatchUsersContainerPropsType, {}, StateType>
//     (mapStateToProps, {
//         follow,
//         unfollow,
//         buttonDisable,
//         requestUsersThunk
//     })
// )(FriendsComponentContainer)
//
// type MapStateUsersContainerPropsType = {
//     users: UsersType[]
//     totalUsersCount: number
//     pageSize: number
//     currentPage: number
//     isFetching: boolean
//     followProcessing: number[]
// }
// type MapDispatchUsersContainerPropsType = {
//     follow: (userId: number) => void
//     unfollow: (userId: number) => void
//     buttonDisable: (followProcessing: boolean, userId: number) => void
//     requestUsersThunk: (currentPage: number, pageSize: number, filter: FilterType) => void
// }
// type UserContainerPropsType = MapStateUsersContainerPropsType & MapDispatchUsersContainerPropsType
