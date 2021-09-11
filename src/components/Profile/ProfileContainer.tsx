import React, {useEffect} from "react";
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {getProfileThunk, getStatusThunk, profileActions} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import withRedirect from "../../HOC/withRedirectComponent";
import {compose} from "redux";
import {getUserIdSelector} from "../../redux/authSelectors";
import { useHistory, useParams } from "react-router-dom";


const ProfileContainer: React.FC = () => {

    const authUserId = useSelector(getUserIdSelector)
    const setOwner = profileActions.setOwner
    const history = useHistory()
    const {userId} = useParams()
    const dispatch = useDispatch()

    const isOwnerMethod = () => {
        if (!userId){
            return true;
        } else if (+userId == authUserId){
            return true
        } else {
            return false
        }
    }
    const profileRefresher = () => {
        let id = userId ? +userId : null;
        if (!id) {
            id = authUserId
            if (!id) {
               history.push('/login');
            }
        }
        if (id) {
            dispatch(getProfileThunk(id))
            dispatch(getStatusThunk(id))
            dispatch(setOwner(isOwnerMethod()))
        }
    }
    useEffect(() => {
        profileRefresher()
    }, [])

    useEffect(() => {
        profileRefresher()
    }, [userId])

    return <Profile/>
}

export default compose<React.ComponentType>(
    withRouter,
    withRedirect
)(ProfileContainer);
