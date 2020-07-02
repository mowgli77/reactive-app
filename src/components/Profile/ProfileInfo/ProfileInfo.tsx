import s from './ProfileInfo.module.css';
import React, {useState} from "react";
import Preloader from "../../Preloader/Preloader";
import defaultPhoto from "../../Users/defaultPhoto.jpg";
import ProfileStatusClass from "./ProfileStatusClass";
import ProfileUsersInfo from "./ProfileUsersInfo";
import ProfileUsersForm from "./ProfileUsersForm";
import {ProfileType} from "../../../types/types";

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatusThunk: (status: string) => void
    addAvatarThunk: (avatarka: File | null) => void
    updateProfileThunk: (profile: ProfileType) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, ...props}) => {

    let [changeAvatar, setChangeAvatar] = useState(false);
    let [newPhoto, setIsSave] = useState<File | null>(null);
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }
    let goSetIsSave = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setIsSave(e.target.files[0]);
            props.addAvatarThunk(e.target.files[0]);
        }
    }
    let addingNewAvatar = () => {
        props.addAvatarThunk(newPhoto);
        setChangeAvatar(false);
        setIsSave(null);
    }
    let inputAppear = () => {
        setChangeAvatar(true)
    }
    let inputHide = () => {
        setChangeAvatar(false)
    }
    let startEditMode = () => {
        setEditMode(true)
    }
    let endEditMode = () => {
        setEditMode(false);
    }
    let updateProfileInfo = (values: ProfileType) => {
        //@ts-ignore
        props.updateProfileThunk(values).then( () => {
            setEditMode(false)})
    }

    return (
        <div className={s.content}>
            <div className={s.ava}>
                <div className={s.avatar}>
                    {!changeAvatar ? <button onClick={inputAppear} title={'Click on avatar to change it'}>
                            <img src={profile.photos.large ? profile.photos.large : defaultPhoto}/>
                        </button>
                        :
                        <img src={profile.photos.large}/>
                     }
                    {changeAvatar && <div>
                        <input type={'file'} onChange={goSetIsSave} autoFocus={true}/>
                    </div>}
                    <div>
                        {!changeAvatar ? <button onClick={inputAppear}>Change avatar</button> :
                            <div>
                                <button onClick={inputHide}>End changing</button>
                                <button onClick={addingNewAvatar} disabled={!newPhoto}>Save new avatar</button>
                            </div>}
                    </div>
                    <div>
                        <ProfileStatusClass updateStatusThunk={props.updateStatusThunk} status={props.status}/>
                    </div>
                    {!editMode ?
                        <ProfileUsersInfo profile={profile} startEditMode={startEditMode}/>
                        :
                        <ProfileUsersForm profile={profile} initialValues={profile} onSubmit={updateProfileInfo} endEditMode={endEditMode}/>
                    }
                </div>
            </div>
        </div>
    )
}



export default ProfileInfo;