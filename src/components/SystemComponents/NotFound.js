import s from "./NotFound.module.css"
import React from "react";
import notFound from "./notFound.jpg"

const Profile = (props) => {

    return (
        <div className={s.notFound404}>
            <img src={notFound}/>
        </div>
        // <div className={s.nf}>
        //     <p className={s.notFound1}>Fucking Page You Are Looking For</p>
        //     <p className={s.notFoundNumber}>404</p>
        //     <p className={s.notFound2}>Is Not Found</p>
        // </div>
    )
}

export default Profile;