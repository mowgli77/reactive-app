import {APIResponseType} from "../types/types";
import {instance} from "./api";

export const followAPI = {
    getFollow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data.resultCode
            });
    },

    getUnFollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
            .then(response => response.data.resultCode);

    },
}