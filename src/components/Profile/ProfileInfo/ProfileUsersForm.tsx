import s from "./ProfileInfo.module.css";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {fieldComponent, GetStringKeys, Input} from "../../common/formsControl";
import {required} from "../../../utilits/validators/validators";
import {ProfileType} from "../../../types/types";


type UsersFormKeysType = GetStringKeys<ProfileType>

const ProfileUsersInfoForm: React.FC<InjectedFormProps<ProfileType, ProfileUsersFormPropsType> & ProfileUsersFormPropsType> = ({profile, handleSubmit, endEditMode, error}) => {

    return <form onSubmit={handleSubmit}>
        <div className={ error && s.err}>
            <div >
                <span>{error}</span>
            </div>
            <div>
                <b>Full name: {fieldComponent<UsersFormKeysType>(Input, 'fullName', 'fullName', [required], undefined, undefined)}</b>
            </div>
            <div>
                <b>About me: {fieldComponent<UsersFormKeysType>(Input, 'aboutMe', 'aboutMe', [], undefined, undefined)}</b>
            </div>
            <div>
                <b>LookingForAJob: {fieldComponent<UsersFormKeysType>(Input, 'lookingForAJob', undefined, [], 'checkbox', undefined)}</b>
            </div>
            <div>
                <b>My working
                    skills: {fieldComponent<UsersFormKeysType>(Input, 'lookingForAJobDescription', 'My working skills', [], undefined, undefined)}</b>
            </div>
            <div className={s.contacts}>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key}>
                        <b>{key}: {fieldComponent(Input, 'contacts.' + key, key, [], undefined, undefined)}</b>
                    </div>
                })}
            </div>
        </div>
        <div>
            <button>Save changes</button><button onClick={endEditMode}>Don`t change</button>
        </div>
    </form>
}


const ProfileUsersForm = reduxForm<ProfileType, ProfileUsersFormPropsType>({form: 'profile'})(ProfileUsersInfoForm);
export default ProfileUsersForm;

type ProfileUsersFormPropsType = {
    profile: ProfileType
    endEditMode: () => void
}