import React, {useEffect} from "react";
import {Users} from "./Users";
import {requestUsersThunk} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getFilter, getPageSize} from "../../redux/usersSelector";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";


const UsersContainer: React.FC = () => {

    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getFilter)
    const { term, friend } = filter

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

        let actualPage = currentPage
        let actualFilter = filter

        const parsed = queryString.parse(history.location.search.substr(1))
        const { term, friend, page } = parsed
        if (!!page) actualPage = Number(page)
        if (!!term) actualFilter.term = term as string
        if (!!friend) {
            switch (friend) {
                case 'null' :
                    actualFilter = { ...actualFilter, friend: null }
                    break
                case 'true' :
                    actualFilter = { ...actualFilter, friend: true}
                    break
                case 'false' :
                    actualFilter = { ...actualFilter, friend: false}
            }
        }

        dispatch(requestUsersThunk(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {

        const query: any = {}
        if (!!term) query.term = term
        if (friend !== null) query.friend = String(friend)
        if (currentPage !== 1) query.page = String(currentPage)
        const stringified = queryString.stringify(query)

        history.push({
            pathname: '/developers',
            search: stringified
        })
    }, [filter, currentPage])

    return <>
        <Users />
    </>
}

export default UsersContainer
