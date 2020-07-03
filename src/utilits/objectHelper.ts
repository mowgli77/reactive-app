import {UsersType} from "../types/types";

export const objectHelper = (array: UsersType[] | null, arrayObjectItem: keyof UsersType, id: number, objectItemThatChange: {followed: boolean}): UsersType[] => {
    return (array!.map(u => {
        if (u[arrayObjectItem] === id) {
            return { ...u, ...objectItemThatChange}}
        return u}
    ))
}