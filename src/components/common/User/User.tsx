import {NavLink} from "react-router-dom";
import defaultPhoto from "../../Users/defaultPhoto.jpg";
import s from "../../Users/Users.module.css";
import React from "react";
import {UsersType} from "../../../types/types";
import {UsersThunkTypes} from "../../../redux/usersReducer";

type UserPropsType = {
    user: UsersType
    followProcessing: number[]
    follow: (userId: number) => UsersThunkTypes
    unfollow: (userId: number) => UsersThunkTypes
}

export const User: React.FC<UserPropsType> = ({user, ...props}) => {
    debugger;
    return <div>
        <NavLink to={'/profile/' + user.id}>
            <img src={user.photos.small != null ? user.photos.small : defaultPhoto} className={s.photo}/>
        </NavLink>
        <div>
            {user.followed ? <button
                    disabled={props.followProcessing.some(id => id === user.id)}
                    onClick={() => props.unfollow(user.id)}>
                    Unfollow</button>
                :
                <button
                    disabled={props.followProcessing.some(id => id === user.id)}
                    onClick={() => props.follow(user.id)}>
                    Follow</button>}
        </div>
        <div>
            <b>I am: </b>{user.name}
        </div>
        <div>
            {user.status && <p><b>My status: </b>{user.status}</p>}
            <hr/>
        </div>
    </div>
}