import {maxTextLength, required} from "../../../utilits/validators/validators";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/formsControl";
import React from "react";
import {DialogsFormValuesType} from "../Dialogs";

const maxLength100 = maxTextLength(100);

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
            <Field label={'Add Your message...'} component={Textarea}
                   name={'message'} validate={[required, maxLength100]}
                   onKeyPress={pressKey}
            />
        </div>
        <div>
            <button>Add message</button>
        </div>
    </form>
}

export const AddMessageForm = reduxForm<DialogsFormValuesType>({form: 'dialog'})(DialogArea);
