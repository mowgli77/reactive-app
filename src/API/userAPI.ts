import {UsersAPIType} from "../types/types";
import {instance} from "./api";
import {FilterType} from "../redux/usersReducer";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, filter: FilterType) {
        return instance.get<UsersAPIType>(`users?page=${currentPage}&count=${pageSize}&term=${filter.term}` + `&friend=${filter.friend == null ? null : filter.friend}`)
            .then(response => {
                return response.data
            })
    }
}
