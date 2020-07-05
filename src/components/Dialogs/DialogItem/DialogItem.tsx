import {NavLink} from "react-router-dom";
import React from "react";
import d from './DialogItem.module.css';


const DialogItem: React.FC<PropsType> = (props) => {
    let path = `/dialogs/${props.id}`
    return (
        <div className={d.di}>
            <NavLink to={path} activeClassName={d.active}>
                <div className={d.nav}>
                    <img className={d.imge} src={props.img} title={props.name}/>
                    <span className={d.namge}>{props.name}</span>
                </div>
            </NavLink>
        </div>
    )
}
export default DialogItem;

type PropsType = {
    id: number
    img: string
    name: string
}
