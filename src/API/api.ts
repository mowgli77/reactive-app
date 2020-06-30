import axios from "axios";
import {AuthMeAPIType, ProfileType, ResultCodeEnumAPIType, UsersAPIType, UsersType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "77e060ca-bd74-426a-8fdf-b1c2469ad476"
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<UsersAPIType>(`users?page=${currentPage}&count${pageSize}`)
            .then(response => {
                return response.data
            })
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },
    putAvatar(avatarka: any) {
        const formData = new FormData();
        formData.append("image", avatarka)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
    },
    updateStatus(status: string) {
        return instance.put<ResultCodeEnumAPIType>(`profile/status`, {status: status})
            .then(response => response.data.resultCode)
    },
    updateProfileInfo(profile: ProfileType) {
        return instance.put(`profile`, profile)
    },
}

export const authAPI = {
    getAuth() {
        return instance.get<AuthMeAPIType>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}

export const followAPI = {
    getFollow(userId: number) {
        return instance.post<ResultCodeEnumAPIType>(`follow/${userId}`)
            .then(response => {
                return response.data.resultCode
            });
    },

    getUnFollow(userId: number) {
        return instance.delete<ResultCodeEnumAPIType>(`follow/${userId}`)
            .then(response => response.data.resultCode);

    },
}

export const securityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
    }
}



