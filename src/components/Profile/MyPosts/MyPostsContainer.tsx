import React from "react";
import {addLikesCount, addPostCreateAction, deletePostAC, ProfileActionTypes} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {PostsType} from "../../../types/types";
import {StateType} from "../../../redux/reduxStore";
import {Dispatch} from "redux";

type MapStatePropsType = {
    posts: PostsType[]
    newPost: any
}
type MapDispatchPropsType = {
    addLikesCount: (id: number) => void
    deletePost: (id: number) => void
    onAddPost: (newPostText: string) => void
}

const mapStateToProps = (state: StateType) => {
    return {
        posts: state.profilePage.posts,
        newPost: state.form.newPost
    }
}
const mapDispatchToProps = (dispatch: Dispatch<ProfileActionTypes>) => {
    return {
        onAddPost: (newPostText: string) => dispatch(addPostCreateAction(newPostText)),
        deletePost: (userID: number) => dispatch(deletePostAC(userID)),
        addLikesCount: (userID: number) => dispatch(addLikesCount(userID))
    }
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;