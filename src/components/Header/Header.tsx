import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import samuraiLogo from "./samuraiLogo.jpg"
import {Avatar, Button, Col, Layout, Row} from "antd";
import { UserOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../../redux/authReducer";
import {getIsAuthSelector, getLoginSelector} from "../../redux/authSelectors";
import {getProfileSelector} from "../../redux/profileSelectors";

const {Header} = Layout;


const HeaderApp: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()

    const isAuth = useSelector(getIsAuthSelector)
    const login = useSelector(getLoginSelector)
    const profile = useSelector(getProfileSelector)
    const photo = profile?.photos.small


    return (
        <Header className="header">
            <Row>
                <Col span={2}><span className={s.image}><img src={samuraiLogo}/></span></Col>
                <Col span={18} ><h1 style={{textAlign: "center", color: "whitesmoke", fontSize: "2rem"}}>SAMURAI NETWORK</h1></Col>
                <Col span={1}>
                        <Avatar size="large" icon={photo ? <img src={photo}/> : <UserOutlined />} />
                </Col>
                <Col span={3}>
                    {isAuth ? <div style={{color: 'whitesmoke'}}>{login}
                            &nbsp; &nbsp;
                            <Button type="default" onClick={() => dispatch(logoutThunk())}>Logout</Button>
                        </div>
                        :
                        <div>
                            <Button type="default" ><NavLink to={'/login'}>Login</NavLink></Button>
                        </div>
                    }
                </Col>
            </Row>
        </Header>


        // <header className={s.header}>
        //     <div>
        //         <h1>SAMURAI NETWORK</h1>
        //         <span className={s.image}><img src={samuraiLogo}/></span>
        //         <a href={'#'} className={props.burger ? s.burgerIsOpen : s.imageBurger}
        //         onClick={props.setBurger}>
        //             <span></span>
        //         </a>
        //         <div className={s.logout}>
        //             {props.isAuth ? <div>{props.login}
        //                     &nbsp;
        //                     <button className={s.logout2} onClick={props.logoutThunk}>Logout</button>
        //                 </div>
        //                 :
        //                 <div className={s.login}>
        //                     <button><NavLink to={'/login'}>Login</NavLink></button>
        //                 </div>
        //             }
        //         </div>
        //     </div>
        // </header>
    )
};

export default HeaderApp;

type PropsType = {
    // isAuth: boolean
    // login: string | null
    // logoutThunk: () => void
    // setBurger: () => void
    // burger: boolean
}
