import s from "./ProfileInfo.module.css";
import React from "react";

const ProfileUsersInfo = ({profile, startEditMode}) => {

    return  <div>
        <div className={s.info}>
            <button onClick={startEditMode}>Edit profile info</button>
        </div>
        <div>
            <b>{profile.fullName}</b>
        </div>
        <div>
            <b>About me: </b>{profile.aboutMe}
        </div>
        <div>
            <b>LookingForAJob: </b>{profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        <div>
            <b>My working skills: </b>{profile.lookingForAJobDescription}
        </div>
        <div className={s.contacts}>
            {Object.keys(profile.contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactName={profile.contacts[key]}/>
            })}
        </div>
    </div>
}

const Contacts = ({contactTitle, contactName}) => {
    return <div>
        <b>{contactTitle}: </b><a href={contactName} target={"_blank"}>{contactName}</a>
    </div>
}

export default ProfileUsersInfo;