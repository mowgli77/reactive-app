import {StateType} from "./reduxStore";


export const getUserIdSelector = (state: StateType) => {
    return state.auth.userId
}
export const getLoginSelector = (state: StateType) => {
    return state.auth.login
}
export const getEmailSelector = (state: StateType) => {
    return state.auth.email
}
export const getIsAuthSelector = (state: StateType) => {
    return state.auth.isAuth
}
export const getBurgerSelector = (state: StateType) => {
    return state.auth.burger
}
export const getCaptchaURLSelector = (state: StateType) => {
    return state.auth.captchaURL
}