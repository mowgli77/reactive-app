import React, {useState} from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import samuraiLogo from "./samuraiLogo.jpg"
import burger_type from "./burger_type.jpg"
import {AuthThunkType, SetBurgerActionType} from "../../redux/authReducer";

type PropsType = {
    isAuth: boolean
    login: string | null
    logoutThunk: () => void
    setBurger: () => void
}


const Header: React.FC<PropsType> = (props) => {

    return (
        <header className={s.header}>
            <div className={s.block}>
                <h1>SAMURAI NETWORK</h1>
                <span className={s.image}><img src={samuraiLogo}/></span>
                <span className={s.imageBurger}
                onClick={props.setBurger}><img src={burger_type}/></span>
                <div className={s.logout}>
                    {props.isAuth ? <div>{props.login}
                            &nbsp;
                            <button className={s.logout2} onClick={props.logoutThunk}>Logout</button>
                        </div>
                        :
                        <div className={s.login}>
                            <button><NavLink to={'/login'}>Login</NavLink></button>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
};

export default Header;
