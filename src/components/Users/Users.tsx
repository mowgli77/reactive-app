import React from "react";
import {Pagination} from "../common/Pagination/Pagination";
import {User} from "../common/User/User";
import Preloader from "../Preloader/Preloader";
import s from "./Users.module.css"
import UsersSearchForm from "./UsersSearchForm";
import {FilterType, requestUsersThunk} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter,
    getIsFetchinge,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector
} from "../../redux/usersSelector";


export const Users: React.FC = () => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsersSelector)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getFilter)
    const isFetching = useSelector(getIsFetchinge)

    const dispatch = useDispatch()

    const onChangedPage = (currentPage: number): void => {
        dispatch(requestUsersThunk(currentPage, pageSize, filter))
    }
    const onChangedFilter = (filter: FilterType): void => {
        dispatch(requestUsersThunk(1, pageSize, filter))
    }

    return <div>
        <UsersSearchForm onChangedFilter={onChangedFilter}/>
        <Pagination totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                    portionSize={10} onChangedPage={onChangedPage}/>
        {isFetching === true ? <Preloader/> : null}
        <div className={s.userPage}>
            {users.map(u => <User user={u} key={u.id}/>)}
        </div>
    </div>
}

export default Users;

// type UsersPropsType = {
//     users: UsersType[]
//     totalUsersCount: number
//     pageSize: number
//     currentPage: number
//     isFetching: boolean
//     followProcessing: number[]
//     onChangedPage: (currentPage: number) => void
//     buttonDisable: (followProcessing: boolean, userId: number) => void
//     follow: (userId: number) => void
//     unfollow: (userId: number) => void
//     onChangedFilter: (filter: FilterType) => void
// }
