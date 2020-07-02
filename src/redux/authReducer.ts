import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsType} from "./reduxStore";
import {authAPI} from "../API/authAPI";
import {securityAPI} from "../API/securityAPI";
import {LoginFormValuesType, ResultCodeCaptchaEnum, ResultCodeEnum} from "../types/types";

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
            return {
                ...state,
                burger: !state.burger
            }
        default:
            return state;
    }
}

export type AuthActionTypes = InferActionsType<typeof reducerActions>
export type AuthThunkType = BaseThunkType<AuthActionTypes | FormAction>

export const reducerActions = {
    setUserAuth: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: SET_USER_AUTH,
        payload: {userId, login, email, isAuth}} as const),
    setCaptcha: (captchaURL: string) => ({type: GET_CAPTCHA_URL, payload: {captchaURL}} as const),
    setBurger: () => ({type: SET_BURGER} as const)
}

export const setUserAuthThunk = (): AuthThunkType => async (dispatch) => {
    let data = await authAPI.getAuth();
    if (data.resultCode === ResultCodeEnum.Succeess) {
        let {id, login, email} = data.data;
        dispatch(reducerActions.setUserAuth(id, login, email, true));
    }
}

export const loginThunk = (values: LoginFormValuesType): AuthThunkType => async (dispatch) => {
    let {email, password, rememberMe, captcha} = values;
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === ResultCodeEnum.Succeess) {
        dispatch(setUserAuthThunk())
    } else {
        if (response.data.resultCode === ResultCodeCaptchaEnum.Captcha) {
            dispatch(getCaptchaThunk());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logoutThunk = (): AuthThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === ResultCodeEnum.Succeess) {
        dispatch(reducerActions.setUserAuth(null, null, null, false));
    }
}

const getCaptchaThunk = (): AuthThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptcha();
    dispatch(reducerActions.setCaptcha(response.data.url));
}

export default authReducer;