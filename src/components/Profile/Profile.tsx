import React from "react";
import profile from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";


const Profile: React.FC = () => {

    return (
        <div className={profile.content}>
                <ProfileInfo />
            <div>
                <MyPosts />
            </div>
        </div>
    )
}

export default Profile;