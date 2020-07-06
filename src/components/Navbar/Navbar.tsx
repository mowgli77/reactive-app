import React from "react";
import nav from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {StateType} from "../../redux/reduxStore";
import {reducerActions} from "../../redux/authReducer";


const Navbar: React.FC<NavbarPropsType> = (props) => {
    return (
        <div className={nav.nav}>
                <nav className={props.burger ? nav.menuBoxActive : nav.menuBox}>
                    <div className={nav.item}><NavLink onClick={props.endBurger} to={'/profile'} activeClassName={nav.active}>PROFILE</NavLink>
                    </div>
                    <div className={nav.item}><NavLink onClick={props.endBurger} to={'/dialogs'} activeClassName={nav.active}>MESSAGES</NavLink>
                    </div>
                    <div className={nav.item}><NavLink onClick={props.endBurger} to={'/users'} activeClassName={nav.active}>USERS</NavLink></div>
                    <div className={nav.item}><NavLink onClick={props.endBurger} to={'/news'} activeClassName={nav.active}>NEWS</NavLink></div>
                    <div className={nav.item}><NavLink onClick={props.endBurger} to={'/music'} activeClassName={nav.active}>MUSIC</NavLink></div>
                    <p></p>
                    <hr/>
                    <div className={nav.item}><NavLink onClick={props.endBurger} to={'/settings'} activeClassName={nav.active}>SETTINGS</NavLink>
                    </div>
                    <p></p>
                    <hr/>
                    <div className={nav.item}><NavLink onClick={props.endBurger} to={'/friends'} activeClassName={nav.active}>FRIENDS</NavLink>
                    </div>
                </nav>
        </div>
    )
}

const endBurger = reducerActions.endBurger
const mapStateToProps = (state: StateType) => {
    return {
        burger: state.auth.burger
    }
}

export default connect(mapStateToProps, {endBurger})(Navbar);

type MapStateNavbarPropsType = {
    burger: boolean
}
type MapDispatchPropsType = {
    endBurger: () => void
}
type NavbarPropsType = MapStateNavbarPropsType & MapDispatchPropsType