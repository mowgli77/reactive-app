import {maxTextLength, required} from "../../../utilits/validators/validators";
import {InjectedFormProps, reduxForm} from "redux-form";
import {fieldComponent, GetStringKeys, Textarea} from "../../common/formsControl";
import React from "react";
import {DialogsFormValuesType} from "../Dialogs";

const maxLength100 = maxTextLength(100);
type AddMessageFormKeysType = GetStringKeys<DialogsFormValuesType>

const DialogArea: React.FC<InjectedFormProps<DialogsFormValuesType>> = (props) => {

    return <form onSubmit={props.handleSubmit}>
        <div>
            {fieldComponent<AddMessageFormKeysType>(Textarea,'message', 'Add Your message...', [maxLength100], undefined, undefined)}
        </div>
        <div>
            <button>Add message</button>
        </div>
    </form>
}

export const AddMessageForm = reduxForm<DialogsFormValuesType>({form: 'dialog'})(DialogArea);
