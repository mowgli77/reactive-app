import React from "react";
import {dialogsActions, getAuthPhotosThunk} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withRedirect from "../../HOC/withRedirectComponent";
import {compose} from "redux";
import {StateType} from "../../redux/reduxStore";
import {DialogsItemsType, MessagesItemsType, PhotosType} from "../../types/types";
import {FormState} from "redux-form";

type MapStatePropsType = {
    dialogsItems: Array<DialogsItemsType>
    messagesItems: Array<MessagesItemsType>
    isAuth: boolean
    dialog: FormState
    userId: number | null
    photos: PhotosType
}
type MapDispatchPropsType = {
    onAddMessage: (message: string) => void
    deleteMessage: (id: number) => void
    getAuthPhotosThunk: (userId: number) => void
}

const onAddMessage = dialogsActions.onAddMessage
const deleteMessage = dialogsActions.deleteMessage

const mapStateToProps = (state: StateType) => {
    return {
        dialogsItems: state.dialogsPage.dialogsItems,
        messagesItems: state.dialogsPage.messagesItems,
        isAuth: state.auth.isAuth,
        dialog: state.form.dialog,
        userId: state.auth.userId,
        photos: state.dialogsPage.photos
    }
}

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps, {onAddMessage, deleteMessage, getAuthPhotosThunk}),
    withRedirect
)(Dialogs);


