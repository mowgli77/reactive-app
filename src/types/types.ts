//Reducers Types
import {ProfileThunkType} from "../redux/profileReducer";

export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    fullName: string | null
    aboutMe: string | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    contacts: {
        [key: string]: string | null
    }
    photos: PhotosType
    userId: number
}
export type UsersType = {
    name: string
    id: number
    photos: PhotosType
    status: string | null
    followed: boolean
    // uniqueUrlName: string | null
}
export type DialogsItemsType = {
    id: number
    name: string
    img: string
}
export type MessagesItemsType = {
    id: number
    message: string
}

// API Types
export type UsersAPIType = {
    items: UsersType[]
    totalCount: number
    error: string | null
}
export enum ResultCodeEnum {
    Succeess = 0,
    Error = 1
}
export enum ResultCodeCaptchaEnum {
    Captcha = 10
}
export type ResultCodeEnumAPIType = {
    resultCode: ResultCodeEnum
}
export type AuthMeAPIType = {
    data: {
        id: number | null
        email: string | null
        login: string | null
    }
    resultCode: ResultCodeEnum | ResultCodeCaptchaEnum
    messages: string[]
}

//C Component's Types:

export type PostPropsType = {
    addLikesCount: (id: number) => void
    message: string
    likesCount: number
    deletePost: (id: number) => void
    id: number
}
export type MyPostsPropsType = {
    posts: PostsType[]
    addLikesCount: (id: number) => void
    deletePost: (id: number) => void
    onAddPost: (newPostText: string) => void
    newPost: any
}
export type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatusThunk: (userId: number) => ProfileThunkType
    addAvatarThunk: (userId: number) => ProfileThunkType
    updateProfileThunk: (userId: number) => ProfileThunkType
}