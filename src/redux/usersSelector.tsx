import {createSelector} from "reselect";
import {StateType} from "./reduxStore";
import {UsersType} from "../types/types";
import {FilterType} from "./usersReducer";

const getUsers = (state: StateType): UsersType[] | null => {
    return state.usersPage.users
    }

export const getUsersSelector = createSelector(getUsers, (users) => {
    return users!.filter(u => true)
})

export const getTotalUsersCount = (state: StateType): number => {
    return state.usersPage.totalUsersCount
    }

export const getPageSize = (state: StateType): number => {
        return state.usersPage.pageSize
    }

export const getCurrentPage = (state: StateType): number => {
        return state.usersPage.currentPage
    }

export const getIsFetchinge = (state: StateType): boolean => {
        return state.usersPage.isFetching
    }

export const getFollowProcessing = (state: StateType): number[] => {
        return state.usersPage.followProcessing
    }

export const getFilter = (state: StateType): FilterType => {
    return state.usersPage.filter
}