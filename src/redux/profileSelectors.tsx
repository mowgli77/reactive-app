import {StateType} from "./reduxStore";
import {PostsType, ProfileType} from "../types/types";

export const getPostsSelector = (state: StateType): PostsType[] => {
    return state.profilePage.posts
}
export const getNewPostSelector = (state: StateType): any => {
    return state.form.newPost
}
export const getProfileSelector = (state: StateType): ProfileType | null => {
    return state.profilePage.profile
}
export const getStatusSelector = (state: StateType): string => {
    return state.profilePage.status
}
export const getOwnerSelector = (state: StateType): boolean => {
    return state.profilePage.isOwner
}