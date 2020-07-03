import {maxTextLength, required} from "../../../utilits/validators/validators";
import {InjectedFormProps, reduxForm} from "redux-form";
import {fieldComponent, GetStringKeys, Textarea} from "../../common/formsControl";
import React from "react";
import {DialogsFormValuesType} from "../Dialogs";

const maxLength100 = maxTextLength(100);
type AddMessageFormKeysType = GetStringKeys<DialogsFormValuesType>

const DialogArea: React.FC<InjectedFormProps<DialogsFormValuesType>> = (props) => {

    let pressKey = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            //@ts-ignore
            props.handleSubmit()
        }
    }

    return <form onSubmit={props.handleSubmit}>
        <div>
            {fieldComponent<AddMessageFormKeysType>(Textarea,'message', 'Add Your message...', [required, maxLength100], undefined, undefined)}
        </div>
        <div>
            <button onKeyPress={pressKey}>Add message</button>
        </div>
    </form>
}

export const AddMessageForm = reduxForm<DialogsFormValuesType>({form: 'dialog'})(DialogArea);
