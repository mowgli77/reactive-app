import React, {useEffect, useState} from "react";
import s from "./ProfileStatus.module.css"


const ProfileStatusHook: React.FC<ProfileStatusPropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const onEditStatus = () => {
        setEditMode(true)
    }
    const offEditStatus = () => {
        setEditMode(false);
        props.updateStatusThunk(status);
    }
    const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }
    const offChanging = () => {
        setEditMode(false)
        setStatus(props.status)
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
            <span onClick={onEditStatus} title={'Click on status to change it'}>{props.status || 'No status'}</span>
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

type ProfileStatusPropsType = {
    status: string
    updateStatusThunk: (status: string) => void
}