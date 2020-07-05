import React from "react";
import nav from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {StateType} from "../../redux/reduxStore";


const Navbar: React.FC<MapStateNavbarPropsType> = (props) => {
    return (
        <div className={nav.nav}>
                <nav className={props.burger ? nav.menuBoxActive : nav.menuBox}>
                    <div className={nav.item}><NavLink to={'/profile'} activeClassName={nav.active}>PROFILE</NavLink>
                    </div>
                    <div className={nav.item}><NavLink to={'/dialogs'} activeClassName={nav.active}>MESSAGES</NavLink>
                    </div>
                    <div className={nav.item}><NavLink to={'/users'} activeClassName={nav.active}>USERS</NavLink></div>
                    <div className={nav.item}><NavLink to={'/news'} activeClassName={nav.active}>NEWS</NavLink></div>
                    <div className={nav.item}><NavLink to={'/music'} activeClassName={nav.active}>MUSIC</NavLink></div>
                    <p></p>
                    <hr/>
                    <div className={nav.item}><NavLink to={'/settings'} activeClassName={nav.active}>SETTINGS</NavLink>
                    </div>
                    <p></p>
                    <hr/>
                    <div className={nav.item}><NavLink to={'/friends'} activeClassName={nav.active}>FRIENDS</NavLink>
                    </div>
                </nav>
        </div>
    )
}
const mapStateToProps = (state: StateType) => {
    return {
        burger: state.auth.burger
    }
}

export default connect(mapStateToProps, {})(Navbar);

type MapStateNavbarPropsType = {
    burger: boolean
}
