import {InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {fieldComponent, GetStringKeys, Input} from "../common/formsControl";
import {notEmail, required} from "../../utilits/validators/validators";
import s from "../common/formsControl.module.css";
import {LoginFormValuesType} from "../../types/types";

type LoginFormOwnPropsType = {
    captchaURL: string | null
}

type LoginFormKeysType = GetStringKeys<LoginFormValuesType>

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = (props) => {
    let pressKey = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            //@ts-ignore
            props.handleSubmit()
        }
    }

    return <form onSubmit={props.handleSubmit}>
        {fieldComponent<LoginFormKeysType>(Input,'email', 'email', [required, notEmail], 'email', undefined)}
        {fieldComponent<LoginFormKeysType>(Input,'password', 'Password', [required], 'password', undefined)}
        {fieldComponent<LoginFormKeysType>(Input,'rememberMe', undefined, [], 'checkbox', 'Remember me')}
        <div className={s.err}>
            <span>{props.error}</span>
        </div>
        <div>
            {props.captchaURL && <img src={props.captchaURL}/>}
            {props.captchaURL && fieldComponent<LoginFormKeysType>(Input, 'captcha', 'Please, enter symbols from the image', [required], undefined, undefined)}
        </div>
        <div>
            <button onKeyPress={pressKey}>Login</button>
        </div>
    </form>
}

export default reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'})(LoginForm);
