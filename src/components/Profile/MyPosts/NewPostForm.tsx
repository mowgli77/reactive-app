import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Textarea} from "../../common/formsControl";
import {maxTextLength, required} from "../../../utilits/validators/validators";
import {MyPosysFormValuesType} from "./MyPosts";

const maxLength300 = maxTextLength(300);


const NewPostComponent: React.FC<InjectedFormProps<MyPosysFormValuesType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name={'newPostText'} component={Textarea} label={'Add your post...'} validate={[required, maxLength300]}/>
        </div>
        <div>
            <button>Add Post</button>
        </div>
    </form>
}

export const NewPostForm = reduxForm<MyPosysFormValuesType>({form: 'newPost'})(NewPostComponent);
