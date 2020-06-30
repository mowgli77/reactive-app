import {NavLink} from "react-router-dom";
import React from "react";
import d from './DialogItem.module.css';

type PropsType = {
    id: number
    img: string
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = `/dialogs/${props.id}`
    return (
        <div className={d.di}>
            <img src={props.img}/>
            <NavLink to={path} activeClassName={d.active}>{props.name}</NavLink>
        </div>
    )
}
export default DialogItem;
