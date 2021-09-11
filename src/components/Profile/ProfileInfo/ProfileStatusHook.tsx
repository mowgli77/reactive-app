import React, {useEffect, useState} from "react";
import s from "./ProfileStatus.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getStatusSelector} from "../../../redux/profileSelectors";
import {updateStatusThunk} from "../../../redux/profileReducer";


const ProfileStatusHook: React.FC = () => {

    const reduxStatus = useSelector(getStatusSelector)

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(reduxStatus);

    const dispatch = useDispatch()

    useEffect(() => {
        setStatus(reduxStatus)
    }, [reduxStatus])

    const onEditStatus = () => {
        setEditMode(true)
    }
    const offEditStatus = () => {
        setEditMode(false);
        dispatch(updateStatusThunk(status));
    }
    const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }
    const offChanging = () => {
        setEditMode(false)
        setStatus(reduxStatus)
    }
    const pressKey = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            if (status.trim().length > 0){
                offEditStatus()
            }
        }
    }

    return <div>
        {!editMode &&
        <div className={s.status}>
            <span onClick={onEditStatus} title={'Click on status to change it'}>{reduxStatus || 'No status'}</span>
        </div>}
        {editMode &&
        <div className={s.status}>
            <input onKeyPress={pressKey} onChange={changeText} autoFocus={true} value={status}/>
            <div>
                <button onClick={offEditStatus}>Add status</button>
                <button onClick={offChanging}>Don`t change</button>
            </div>
        </div>}
    </div>
}

export default ProfileStatusHook;
