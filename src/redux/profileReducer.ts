import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType, ResultCodeEnum} from "../types/types";
import {BaseThunkType, InferActionsType} from "./reduxStore";
import {profileAPI} from "../API/profileAPI";

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_USERS_STATUS = 'SET_USERS_STATUS';
const ADD_AVATAR = 'ADD_AVATAR';
const ADD_LIKE = 'ADD_LIKE';
const SET_OWNER = 'SET_OWNER';


let initialState = {
    posts: [
        {id: 1, message: 'Where is my car, dune?!', likesCount: 13},
        {id: 2, message: 'Here is it', likesCount: 69},
        {id: 3, message: 'Lucky!!!', likesCount: 77}
    ] as PostsType[],
    profile: null as ProfileType | null,
    status: '',
    isOwner: false
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
        case SET_OWNER:
            return {
                ...state,
                isOwner: action.isOwner
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(u => u.id !== action.userId)
            }
        case ADD_AVATAR:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        case ADD_LIKE:
            return {
                ...state,
                posts: state.posts.map(p => {
                        if (p.id === action.id) {
                            return {...p, likesCount: p.likesCount + 1}
                        }
                        return p
                    }
                )
            }
        default:
            return state;
    }
}


export type ProfileActionTypes = InferActionsType<typeof profileActions>

export type ProfileThunkType = BaseThunkType<ProfileActionTypes | FormAction>

export const profileActions = {
    onAddPost: (newPostText: string) => ({type: ADD_POST, newPostText} as const),
    deletePost: (userId: number) => ({type: DELETE_POST, userId} as const),
    setUsersProfile: (profile: ProfileType) => ({type: SET_USERS_PROFILE, profile} as const),
    setUsersStatus: (status: string) => ({type: SET_USERS_STATUS, status} as const),
    addAvatarSuccess: (photos: PhotosType) => ({type: ADD_AVATAR, photos} as const),
    addLikesCount: (id: number) => ({type: ADD_LIKE, id} as const),
    setOwner: (isOwner: boolean) => ({type: SET_OWNER, isOwner} as const),
}
export const getProfileThunk = (userId: number): ProfileThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(profileActions.setUsersProfile(data));
}
export const getStatusThunk = (userId: number): ProfileThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(profileActions.setUsersStatus(data));
}
export const updateStatusThunk = (status: string): ProfileThunkType => async (dispatch) => {
    let resultCode = await profileAPI.updateStatus(status);
    if (resultCode === ResultCodeEnum.Succeess) {
        dispatch(profileActions.setUsersStatus(status))
    }
}
export const addAvatarThunk = (avatarka: File | null): ProfileThunkType => async (dispatch) => {
    let response = await profileAPI.putAvatar(avatarka);
    if (response.data.resultCode === ResultCodeEnum.Succeess) {
        dispatch(profileActions.addAvatarSuccess(response.data.data.photos))
    }
}

export const updateProfileThunk = (profile: ProfileType): ProfileThunkType => async (dispatch, getState) => {
    let userId = getState().profilePage.profile!.userId;
    let response = await profileAPI.updateProfileInfo(profile);
    if (response.data.resultCode === ResultCodeEnum.Succeess) {
        dispatch(getProfileThunk(userId))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('profile', {_error: `!${message}`}));
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;