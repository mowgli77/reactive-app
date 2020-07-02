import React, {useEffect} from "react";
import dialogs from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {AddMessageForm} from "./Message/AddMessageForm";
import {DialogsItemsType, MessagesItemsType, PhotosType} from "../../types/types";
import {FormState} from "redux-form";

type DialogsPropsType = {
    dialogsItems: Array<DialogsItemsType>
    messagesItems: Array<MessagesItemsType>
    onAddMessage: (message: string) => void
    dialog: DialogsFormState
    deleteMessage: (id: number) => void
    getAuthPhotosThunk: (userId: number) => void
    userId: number
    photos: PhotosType
}

interface DialogsFormState extends FormState {
    values: {message: string}
}
export type DialogsFormValuesType = {
        message: string
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    useEffect(() => {
        props.getAuthPhotosThunk(props.userId)
    }, [])

    let dialogElements = props.dialogsItems.map(d => <DialogItem img={d.img} name={d.name} id={d.id} key={d.id}/>);
    let messageElements = props.messagesItems.map(m => <Message message={m.message} id={m.id} key={m.id} photos={props.photos} deleteMessage={props.deleteMessage}/>);


    let addMessage = (values: DialogsFormValuesType) => {
        if (values.message.trim().length > 0) {
            props.onAddMessage(values.message);
            props.dialog.values.message = ''
        }
    }

    return (
        <div className={dialogs.dialogs}>
            <div className={dialogs.names}>
                {dialogElements}
            </div>
            <div className={dialogs.messages}>
                {messageElements}
            </div>
            <div className={dialogs.bot}>
                <AddMessageForm onSubmit={addMessage}/>
            </div>
        </div>
    )
}

export default Dialogs;

