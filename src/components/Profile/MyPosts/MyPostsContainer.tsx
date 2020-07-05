import React from "react";
import {profileActions} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {PostsType} from "../../../types/types";
import {StateType} from "../../../redux/reduxStore";

const mapStateToProps = (state: StateType) => {
    return {
        posts: state.profilePage.posts,
        newPost: state.form.newPost
    }
}
const addLikesCount = profileActions.addLikesCount
const deletePost = profileActions.deletePost
const onAddPost = profileActions.onAddPost

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>
(mapStateToProps, {onAddPost, deletePost, addLikesCount})(MyPosts)
export default MyPostsContainer;

type MapStatePropsType = {
    posts: PostsType[]
    newPost: any
}
type MapDispatchPropsType = {
    addLikesCount: (id: number) => void
    deletePost: (id: number) => void
    onAddPost: (newPostText: string) => void
}

