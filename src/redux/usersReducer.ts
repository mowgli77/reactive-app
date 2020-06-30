import {followAPI, usersAPI} from "../API/api";
import {objectHelper} from "../utilits/objectHelper";
import {UsersType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./reduxStore";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const FOLLOW_PROCESSING = 'FOLLOW_PROCESSING';

let initialState = {
    users: [] as UsersType[] | null,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followProcessing: [] as number[]
};
type InitialStateType = typeof initialState

let usersReducer = (state = initialState, action: UsersActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: objectHelper(state.users, 'id', action.id, {followed: true})
                // users: state.users.map(u => {
                //  if (u.id === action.id) {
                //      return { ...u, followed: true}}
                //      return u}
                //  )
            }
        case UNFOLLOW:
            return {
                ...state,
                users: objectHelper(state.users, "id", action.id, {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalUsersCount
            }
        case IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case FOLLOW_PROCESSING:
            return {
                ...state,
                followProcessing: action.followProcessing
                    ? [...state.followProcessing, action.userId]
                    : state.followProcessing.filter(id => id != action.userId)
            }

        default:
            return state;
    }
}


type FollowSuccessActionType = {
    type: typeof FOLLOW
    id: number
}

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    id: number
}
type SetUsersActionType = {
    type: typeof SET_USERS
    users: UsersType[]
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type SetTotalCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
type IsFetchingSetActionType = {
    type: typeof IS_FETCHING
    isFetching: boolean
}
export type ButtonDisableActionType = {
    type: typeof FOLLOW_PROCESSING
    followProcessing: boolean
    userId: number
}
export type UsersActionType = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
    SetCurrentPageActionType | SetTotalCountActionType | IsFetchingSetActionType | ButtonDisableActionType

export type UsersThunkTypes = ThunkAction<Promise<void>, StateType, unknown, UsersActionType>

export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, id: userId});
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, id: userId});
export const setUsers = (users: UsersType[]): SetUsersActionType => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
});
export const setTotalCount = (totalUsersCount: number): SetTotalCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
});
export const isFetchingSet = (isFetching: boolean): IsFetchingSetActionType => ({type: IS_FETCHING, isFetching});
export const buttonDisable = (followProcessing: boolean, userId: number): ButtonDisableActionType =>
    ({type: FOLLOW_PROCESSING, followProcessing, userId});


export const requestUsersThunk = (currentPage: number, pageSize: number): UsersThunkTypes => async (dispatch: Dispatch<UsersActionType>) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(isFetchingSet(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(isFetchingSet(false));
    dispatch(setTotalCount(data.totalCount));
}

const _followUnfollowFlow = async (userId: number, dispatch: Dispatch<UsersActionType>, serverAPI: any, ac: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {

    dispatch(buttonDisable(true, userId));
    let resultCode = await serverAPI(userId);
    if (resultCode === 0) {
        dispatch(ac(userId))
    }
    dispatch(buttonDisable(false, userId));
}


export const follow = (userId: number): UsersThunkTypes => async (dispatch) => {
    _followUnfollowFlow(userId, dispatch, followAPI.getFollow.bind(followAPI), followSuccess)
//     dispatch(buttonDisable(true, userId));
//     let resultCode = await followAPI.getFollow(userId);
//     if (resultCode === 0) {
//         dispatch(followSuccess(userId))
//     }
//     dispatch(buttonDisable(false, userId));
}

export const unfollow = (userId: number): UsersThunkTypes => async (dispatch) => {
    _followUnfollowFlow(userId, dispatch, followAPI.getUnFollow.bind(followAPI), unfollowSuccess)
    // dispatch(buttonDisable(true, userId));
    // let resultCode = await followAPI.getUnFollow(userId);
    // if (resultCode === 0) {
    //     dispatch(unfollowSuccess(userId))
    // }
    // dispatch(buttonDisable(false, userId));
}

export default usersReducer;