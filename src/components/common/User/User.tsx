import {NavLink} from "react-router-dom";
import defaultPhoto from "../../Users/defaultPhoto.jpg";
import s from "../../Users/Users.module.css";
import React from "react";
import {UsersType} from "../../../types/types";

export const User: React.FC<UserPropsType> = ({user, ...props}) => {
    return <div className={s.userBlock}>
        <NavLink className={s.userPhoto} to={'/profile/' + user.id}>
            <img src={user.photos.small != null ? user.photos.small : defaultPhoto} className={s.photo}/>
        </NavLink>
        <div className={s.name}>
            <b>{user.name}</b>
        </div>
        <div className={s.status }>
            {user.status && <p><b>My status: </b>{user.status}</p>}
        </div>
        <div className={s.follow}>
            {user.followed ? <button style={{color: 'red'}}
                    disabled={props.followProcessing.some(id => id === user.id)}
                    onClick={() => props.unfollow(user.id)}>
                    Unfollow</button>
                :
                <button style={{color: 'green'}}
                    disabled={props.followProcessing.some(id => id === user.id)}
                    onClick={() => props.follow(user.id)}>
                    Follow</button>}
        </div>
    </div>
}

type UserPropsType = {
    user: UsersType
    followProcessing: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}