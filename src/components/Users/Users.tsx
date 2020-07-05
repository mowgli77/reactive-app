import React from "react";
import {Pagination} from "../common/Pagination/Pagination";
import {User} from "../common/User/User";
import Preloader from "../Preloader/Preloader";
import {UsersType} from "../../types/types";
import s from "./Users.module.css"


const Users: React.FC<UsersPropsType> = (props) => {

    return <div>
        <Pagination totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                    portionSize={10} onChangedPage={props.onChangedPage}/>
        {props.isFetching === true ? <Preloader/> : null}
        <div className={s.userPage}>
            {props.users.map(u => <User {...props} user={u} key={u.id}/>)}
        </div>
    </div>
}

export default Users;

type UsersPropsType = {
    users: UsersType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followProcessing: number[]
    onChangedPage: (currentPage: number) => void
    buttonDisable: (followProcessing: boolean, userId: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void

}
