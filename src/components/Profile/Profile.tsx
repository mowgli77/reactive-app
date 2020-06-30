import React from "react";
import profile from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfilePropsType} from "../../types/types";

const Profile: React.FC<ProfilePropsType> = (props) => {

    return (
        <div className={profile.content}>
                <ProfileInfo addAvatarThunk={props.addAvatarThunk} profile={props.profile} updateStatusThunk={props.updateStatusThunk}
                             updateProfileThunk={props.updateProfileThunk} status={props.status}/>
            <div>
                <MyPostsContainer />
            </div>
        </div>
    )
}

export default Profile;