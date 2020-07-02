import {UsersAPIType} from "../types/types";
import {instance} from "./api";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<UsersAPIType>(`users?page=${currentPage}&count${pageSize}`)
            .then(response => {
                return response.data
            })
    }
}