import {profileAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./reduxStore";

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_USERS_STATUS = 'SET_USERS_STATUS';
const ADD_AVATAR = 'ADD_AVATAR';
const ADD_LIKE = 'ADD_LIKE';


let initialState = {
    posts: [
        {id: 1, message: 'Where is my car, dune?!', likesCount: 13},
        {id: 2, message: 'Here is it', likesCount: 69},
        {id: 3, message: 'Fuck!!!', likesCount: 77}
    ] as PostsType[],
    profile: null as ProfileType | null,
    status: ''
};
type InitialStateType = typeof initialState

let profileReducer = (state = initialState, action: ProfileActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, message: action.newPostText, likesCount: 0}],
            }
        case SET_USERS_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_USERS_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(u => u.id !== action.userId)
            }
        case ADD_AVATAR:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos} as ProfileType
            }
        case ADD_LIKE:
            return {
                ...state,
                 posts: state.posts.map(p => {
                    if (p.id === action.id) {
                        return { ...p, likesCount: p.likesCount + 1}}
                    return p}
                )
            }
        default:
            return state;
    }
}

type AddPostCreateActionType = {
    type: typeof ADD_POST
    newPostText: string
}
type DeletePostACType = {
    type: typeof DELETE_POST
    userId: number
}
type SetUsersProfileType = {
    type: typeof SET_USERS_PROFILE
    profile: ProfileType
}
type SetUsersStatusType = {
    type: typeof SET_USERS_STATUS
    status: string
}
type AddAvatarSuccessActionType = {
    type: typeof ADD_AVATAR
    photos: PhotosType
}
type AddLikesCountActionType = {
    type: typeof ADD_LIKE
    id: number
}
export type ProfileActionTypes = AddPostCreateActionType | DeletePostACType | SetUsersProfileType | SetUsersStatusType |
    AddAvatarSuccessActionType | AddLikesCountActionType
export type ProfileThunkType = ThunkAction<Promise<void>, StateType, unknown, ProfileActionTypes>

export const addPostCreateAction = (newPostText: string): AddPostCreateActionType => ({type: ADD_POST, newPostText});
export const deletePostAC = (userId: number): DeletePostACType => ({type: DELETE_POST, userId});
export const setUsersProfile = (profile: ProfileType): SetUsersProfileType => ({type: SET_USERS_PROFILE, profile});
export const setUsersStatus = (status: string): SetUsersStatusType => ({type: SET_USERS_STATUS, status});
export const addAvatarSuccess = (photos: PhotosType): AddAvatarSuccessActionType => ({type: ADD_AVATAR, photos});
export const addLikesCount = (id: number): AddLikesCountActionType => ({type: ADD_LIKE, id});

export const getProfileThunk = (userId: number): ProfileThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(setUsersProfile(data));
}
export const getStatusThunk = (userId: number): ProfileThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setUsersStatus(data));
}
export const updateStatusThunk = (status: string): ProfileThunkType => async (dispatch) => {
    let resultCode = await profileAPI.updateStatus(status);
    if (resultCode === 0) {
        dispatch(setUsersStatus(status))
    }
}
export const addAvatarThunk = (avatarka: string): ProfileThunkType => async (dispatch) => {
    let response = await profileAPI.putAvatar(avatarka);
    if (response.data.resultCode === 0) {
        dispatch(addAvatarSuccess(response.data.data.photos))
    }
}

export const updateProfileThunk = (profile: ProfileType): ProfileThunkType => async (dispatch, getState) => {
    let userId = getState().profilePage.profile!.userId;
    let response = await profileAPI.updateProfileInfo(profile);
    if (response.data.resultCode === 0) {
        dispatch(getProfileThunk(userId))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        //@ts-ignore
        dispatch(stopSubmit('profile', {_error: `!${message}`}));
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;