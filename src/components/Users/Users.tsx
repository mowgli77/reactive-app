import React from "react";
import {Pagination} from "../common/Pagination/Pagination";
import {User} from "../common/User/User";
import Preloader from "../Preloader/Preloader";
import {UsersType} from "../../types/types";
import {ButtonDisableActionType, UsersThunkTypes} from "../../redux/usersReducer";

type UsersPropsType = {
    users: UsersType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followProcessing: number[]
    onChangedPage: (currentPage: number) => void
    buttonDisable: (followProcessing: boolean, userId: number) => ButtonDisableActionType
    follow: (userId: number) => UsersThunkTypes
    unfollow: (userId: number) => UsersThunkTypes

}

const Users: React.FC<UsersPropsType> = (props) => {

    return <div>
        <Pagination totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                    portionSize={20} onChangedPage={props.onChangedPage}/>
        {props.isFetching === true ? <Preloader/> : null}
        {
            props.users.map(u => <User {...props} user={u} key={u.id}/>

            )
        }
    </div>
}

export default Users;