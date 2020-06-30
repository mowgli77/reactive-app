import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./reduxStore";

const SET_USER_AUTH = 'SET_USER_AUTH';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';
const SET_BURGER = 'SET_BURGER';

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaURL: null as string | null,
    burger: false
};

type InitialStateType = typeof initialState

let authReducer = (state = initialState, action: AuthActionTypes): InitialStateType => {

    switch (action.type) {

        case SET_USER_AUTH:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            }
        case SET_BURGER:
            return  {
                ...state,
                burger: !state.burger
            }
        default:
            return state;
    }
}

type SetUserAuthActionType = {
    type: typeof SET_USER_AUTH,
    payload: {
        userId: number | null
        login: string | null
        email: string | null
        isAuth: boolean
    }
}
type SetCaptchaActionType = {
    type: typeof GET_CAPTCHA_URL
    payload: { captchaURL: string }
}
export type LoginFormValuesType = {
        email: string
        password: string
        rememberMe: boolean
        captcha: string
    }
export type SetBurgerActionType = {
    type: typeof SET_BURGER
}

type AuthActionTypes = SetUserAuthActionType | SetCaptchaActionType | SetBurgerActionType
export type AuthThunkType = ThunkAction<Promise<void>, StateType, unknown, AuthActionTypes>

export const setUserAuth = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetUserAuthActionType => ({
    type: SET_USER_AUTH,
    payload: {userId, login, email, isAuth}
});
export const setCaptcha = (captchaURL: string): SetCaptchaActionType => ({type: GET_CAPTCHA_URL, payload: {captchaURL}});
export const setBurger = (): SetBurgerActionType  => ({type: SET_BURGER})

export const setUserAuthThunk = (): AuthThunkType => async (dispatch) => {
    let data = await authAPI.getAuth();
    if (data.resultCode === 0) {
        let {id, login, email} = data.data;
        dispatch(setUserAuth(id, login, email, true));
    }
}

export const loginThunk = (values: LoginFormValuesType): AuthThunkType => async (dispatch) => {
    let {email, password, rememberMe, captcha} = values;
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(setUserAuthThunk())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaThunk());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        //@ts-ignore
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logoutThunk = (): AuthThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setUserAuth(null, null, null, false));
    }
}

const getCaptchaThunk = (): AuthThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptcha();
    dispatch(setCaptcha(response.data.url));
}

export default authReducer;