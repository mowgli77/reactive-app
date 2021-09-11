import {objectHelper} from "../utilits/objectHelper";
import {ResultCodeEnum, UsersType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {InferActionsType, StateType} from "./reduxStore";
import {Dispatch} from "redux";
import {usersAPI} from "../API/userAPI";
import {followAPI} from "../API/followAPI";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const FOLLOW_PROCESSING = 'FOLLOW_PROCESSING';
const SET_FILTERS = 'SET_FILTERS';

let initialState = {
    users: [] as UsersType[] | null,
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followProcessing: [] as number[],
    filter: {
        term: '',
        friend: null as null | boolean
    }
};
type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

let usersReducer = (state = initialState, action: UsersActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: objectHelper(state.users, 'id', action.id, {followed: true})
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
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case FOLLOW_PROCESSING:
            return {
                ...state,
                followProcessing: action.followProcessing
                    ? [...state.followProcessing, action.userId]
                    : state.followProcessing.filter(id => id != action.userId)
            }
        case SET_FILTERS:
            return {
                ...state,
                filter: action.filter
            }

        default:
            return state;
    }
}


export type UsersActionType = InferActionsType<typeof usersActions>

export type UsersThunkTypes = ThunkAction<Promise<void>, StateType, unknown, UsersActionType>

export const usersActions = {
    followSuccess: (userId: number) => ({type: FOLLOW, id: userId} as const),
    unfollowSuccess: (userId: number) => ({type: UNFOLLOW, id: userId} as const),
    setUsers: (users: UsersType[]) => ({type: SET_USERS, users} as const),
    setCurrentPage: (currentPage: number) => ({
        type: SET_CURRENT_PAGE,
        currentPage
    } as const),
    setTotalCount: (totalUsersCount: number) => ({
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    } as const),
    isFetchingSet: (isFetching: boolean) => ({type: IS_FETCHING, isFetching} as const),
    setFilters: (filter: FilterType) => ({type: SET_FILTERS, filter} as const),
    buttonDisable: (followProcessing: boolean, userId: number) =>
        ({type: FOLLOW_PROCESSING, followProcessing, userId} as const),
}

export const requestUsersThunk = (currentPage: number, pageSize: number, filter: FilterType): UsersThunkTypes => async (dispatch: Dispatch<UsersActionType>) => {
    dispatch(usersActions.setCurrentPage(currentPage));
    dispatch(usersActions.isFetchingSet(true));
    dispatch(usersActions.setFilters(filter));
    let data = await usersAPI.getUsers(currentPage, pageSize, filter);
    dispatch(usersActions.setUsers(data.items));
    dispatch(usersActions.isFetchingSet(false));
    dispatch(usersActions.setTotalCount(data.totalCount));
}

const _followUnfollowFlow = async (userId: number, dispatch: Dispatch<UsersActionType>, serverAPI: (userId: number) => Promise<ResultCodeEnum>, ac: (userId: number) => UsersActionType) => {

    dispatch(usersActions.buttonDisable(true, userId));
    let resultCode = await serverAPI(userId);
    if (resultCode === ResultCodeEnum.Succeess) {
        dispatch(ac(userId))
    }
    dispatch(usersActions.buttonDisable(false, userId));
}


export const follow = (userId: number): UsersThunkTypes => async (dispatch) => {
    _followUnfollowFlow(userId, dispatch, followAPI.getFollow.bind(followAPI), usersActions.followSuccess)

}

export const unfollow = (userId: number): UsersThunkTypes => async (dispatch) => {
    _followUnfollowFlow(userId, dispatch, followAPI.getUnFollow.bind(followAPI), usersActions.unfollowSuccess)
}

export default usersReducer;