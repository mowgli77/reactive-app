import {InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {fieldComponent, GetStringKeys, Textarea} from "../../common/formsControl";
import {maxTextLength, required} from "../../../utilits/validators/validators";
import {MyPostsFormValuesType} from "./MyPosts";

const maxLength300 = maxTextLength(300);
type PostFormKeysType = GetStringKeys<MyPostsFormValuesType>

const NewPostComponent: React.FC<InjectedFormProps<MyPostsFormValuesType>> = (props) => {
    let pressKey = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            //@ts-ignore
            props.handleSubmit()
        }
    }
    return <form onSubmit={props.handleSubmit}>
        <div>
            {fieldComponent<PostFormKeysType>(Textarea,'newPostText', 'Add your post...', [required, maxLength300], undefined, undefined)}
        </div>
        <div>
            <button onKeyPress={pressKey}>Add Post</button>
        </div>
    </form>
}

export const NewPostForm = reduxForm<MyPostsFormValuesType>({form: 'newPost'})(NewPostComponent);
