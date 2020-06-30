import React from "react";
import s from "./formsControl.module.css";
import {Field, WrappedFieldProps} from "redux-form";
import {ValidatorsType} from "../../utilits/validators/validators";

type FieldsPropsType = WrappedFieldProps & {
    label: string | undefined
    text?: string | undefined
}

export const Textarea: React.FC<FieldsPropsType> = ({input, meta: {touched, error, warning}, label, ...props}) => {
    return <div>
        <div className={touched && error && s.err || s.noError}>
            <textarea placeholder={label} {...input} {...props} />
        </div>
        <div className={s.err}>
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
}

export const Input: React.FC<FieldsPropsType> = ({input, label, meta: {touched, error, warning}, ...props}) => {
    return <div>
        <div className={touched && error && s.err}>
            <input placeholder={label} {...input} {...props} />{props.text}
        </div>
        <div className={s.err}>
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
}

export function fieldComponent<T extends string> (component: React.FC<FieldsPropsType>,
                               name: T,
                               label: string | undefined,
                               validate: ValidatorsType[],
                               type: string | undefined,
                               text: string | undefined) {
    return (<div>
        <Field component={component} text={text} name={name} label={label} validate={validate} type={type} />
    </div>)
}
