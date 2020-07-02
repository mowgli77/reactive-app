import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "77e060ca-bd74-426a-8fdf-b1c2469ad476"
    }
})




