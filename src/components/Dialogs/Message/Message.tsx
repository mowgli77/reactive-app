import dialogs from "../Dialogs.module.css";
import React from "react";
import defaultPhoto from "../../Users/defaultPhoto.jpg"
import {PhotosType} from "../../../types/types";

type MessagesPropsType = {
    message: string
    deleteMessage: (id: number) => void
    id: number
    photos: PhotosType

}

const Message: React.FC<MessagesPropsType> = (props) => {
    return (
        <div className={dialogs.block}>
            <div className={dialogs.messageImg}>
                <img src={props.photos.small ? props.photos.small : defaultPhoto} />
            </div>
            <div className={dialogs.message}>{props.message}</div>
            <div className={dialogs.deleteButton}>
                <i className={`${dialogs.small} material-icons`} onClick={() => props.deleteMessage(props.id)}>delete</i>
            </div>
        </div>
    )
}

//@ts-ignore
export default Message;