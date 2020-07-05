import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import samuraiLogo from "./samuraiLogo.jpg"


const Header: React.FC<PropsType> = (props) => {

    return (
        <header className={s.header}>
            <div>
                <h1>SAMURAI NETWORK</h1>
                <span className={s.image}><img src={samuraiLogo}/></span>
                <a href={'#'} className={props.burger ? s.burgerIsOpen : s.imageBurger}
                onClick={props.setBurger}>
                    <span></span>
                </a>
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

type PropsType = {
    isAuth: boolean
    login: string | null
    logoutThunk: () => void
    setBurger: () => void
    burger: boolean
}
