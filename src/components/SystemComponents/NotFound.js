import s from "./NotFound.module.css"
import React from "react";

const Profile = (props) => {

    return (
        <div className={s.nf}>
            <p className={s.notFoundNumber}>404</p>
            <p className={s.notFound2}>Page Not Found</p>
        </div>
    )
}

export default Profile;