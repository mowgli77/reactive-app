import s from "./ProfileInfo.module.css";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {fieldComponent, Input} from "../../common/formsControl";
import {notEmail, required} from "../../../utilits/validators/validators";
import {ProfileType} from "../../../types/types";

type ProfileUsersFormPropsType = {
    profile: ProfileType
    endEditMode: () => void
}
type UsersFormType = {
    fullName: string
    aboutMe: string
    lookingForAJob: string
    lookingForAJobDescription: string
    contacts: {
        [key: string]: string
    }
}
type UsersFormKeysType = Extract<keyof UsersFormType, string>
const ProfileUsersInfoForm: React.FC<InjectedFormProps<ProfileType, ProfileUsersFormPropsType> & ProfileUsersFormPropsType> = ({profile, handleSubmit, endEditMode, error}) => {

    return <form onSubmit={handleSubmit}>
        <div>
            <button>Save changes</button><button onClick={endEditMode}>Don`t change</button>
        </div>
        <div className={ error && s.err}>
            <div >
                <span>{error}</span>
            </div>
            <div>
                <b>Full name: {fieldComponent<UsersFormKeysType>(Input, 'fullName', 'fullName', [], undefined, undefined)}</b>
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
    </form>
}


const ProfileUsersForm = reduxForm<ProfileType, ProfileUsersFormPropsType>({form: 'profile'})(ProfileUsersInfoForm);
// @ts-ignore
export default ProfileUsersForm;