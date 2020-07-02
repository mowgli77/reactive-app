import {APIResponseType, AuthMeDataType, LoginDataType, ResultCodeCaptchaEnum, ResultCodeEnum} from "../types/types";
import {instance} from "./api";

export const authAPI = {
    getAuth() {
        return instance.get<APIResponseType<AuthMeDataType>>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
        return instance.post<APIResponseType<LoginDataType, ResultCodeEnum | ResultCodeCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete<APIResponseType>(`auth/login`)
    },
}