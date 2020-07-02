import {APIResponseType, DataPhotosType, PhotosType, ProfileType} from "../types/types";
import {instance} from "./api";

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
        return instance.put<APIResponseType<DataPhotosType>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status})
            .then(response => response.data.resultCode)
    },
    updateProfileInfo(profile: ProfileType) {
        return instance.put(`profile`, profile)
    },
}