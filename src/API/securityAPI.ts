import {instance} from "./api";
import {SecurityCaptchaType} from "../types/types";

export const securityAPI = {
    getCaptcha() {
        return instance.get<SecurityCaptchaType>(`security/get-captcha-url`)
    }
}