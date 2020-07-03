//Reducers Types

export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type PhotosType = {
    small: string | undefined
    large: string | undefined
}
export type ContactsType = {
    github: string | undefined
    vk: string | undefined
    facebook: string | undefined
    instagram: string | undefined
    twitter: string | undefined
    website: string | undefined
    youtube: string | undefined
    mainLink: string | undefined
}
export type ProfileType = {
    fullName: string | null
    aboutMe: string | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    contacts: ContactsType
    photos: PhotosType
    userId: number
}

export type UsersType = {
    name: string
    id: number
    photos: PhotosType
    status: string | null
    followed: boolean
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
export type APIResponseType<D = {}, R = ResultCodeEnum> = {
    data: D
    resultCode: R
    messages: string[]
}
export type AuthMeDataType = {
    id: number | null
    email: string | null
    login: string | null
}
export type LoginDataType = {
    userId: number
}
export type SecurityCaptchaType = {
    url: string
}
export type DataPhotosType = {
    photos: PhotosType
}

// Component's Types:
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
    updateStatusThunk: (status: string) => void
    addAvatarThunk: (avatarka: File | null) => void
    updateProfileThunk: (profile: ProfileType) => void
    isOwner: boolean
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}