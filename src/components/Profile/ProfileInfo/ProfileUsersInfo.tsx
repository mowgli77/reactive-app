import s from "./ProfileInfo.module.css";
import React from "react";
import {ContactsType, ProfileType} from "../../../types/types";

type ProfileUsersInfoPropsType = {
    profile: ProfileType
    isOwner: boolean
    startEditMode: () => void
}
const ProfileUsersInfo: React.FC<ProfileUsersInfoPropsType> = ({profile, startEditMode, isOwner}) => {

    return  <div>
        <div className={s.info}>
            {isOwner ? <button onClick={startEditMode}>Edit profile info</button> : undefined}
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
                return <Contacts key={key} contactTitle={key} contactName={profile.contacts[key as keyof ContactsType]}/>
            })}
        </div>
    </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactName: string | undefined
}
const Contacts: React.FC<ContactsPropsType> = ({contactTitle, contactName}) => {
    return <div>
        <b>{contactTitle}: </b><a href={contactName} target={"_blank"}>{contactName}</a>
    </div>
}

export default ProfileUsersInfo;