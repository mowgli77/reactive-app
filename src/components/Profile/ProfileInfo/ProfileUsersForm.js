import s from "./ProfileInfo.module.css";
import React from "react";
import {reduxForm} from "redux-form";
import {fieldComponent, Input} from "../../common/formsControl";
import {notEmail, required} from "../../../utilits/validators/validators";

const ProfileUsersInfoForm = ({profile, handleSubmit, endEditMode, error}) => {

    return <form onSubmit={handleSubmit}>
        <div>
            <button>Save changes</button><button onClick={endEditMode}>Don`t change</button>
        </div>
        <div className={ error && s.err}>
            <div >
                <span>{error}</span>
            </div>
            <div>
                <b>Full name: {fieldComponent(Input, 'fullName', 'fullName', [], null, null)}</b>
            </div>
            <div>
                <b>About me: {fieldComponent(Input, 'aboutMe', 'aboutMe', [], null, null)}</b>
            </div>
            <div>
                <b>LookingForAJob: {fieldComponent(Input, 'lookingForAJob', null, [], 'checkbox', null)}</b>
            </div>
            <div>
                <b>My working
                    skills: {fieldComponent(Input, 'lookingForAJobDescription', 'My working skills', [], null, null)}</b>
            </div>
            <div className={s.contacts}>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key}>
                        <b>{key}: {fieldComponent(Input, 'contacts.' + key, key, [], null, null)}</b>
                    </div>
                })}
            </div>
        </div>
    </form>
}

const Contacts = ({contactTitle, contactName}) => {
    return <div>
        <b>{contactTitle}: </b> {contactName}
    </div>
}

const ProfileUsersForm = reduxForm({form: 'profile'})(ProfileUsersInfoForm);
export default ProfileUsersForm;