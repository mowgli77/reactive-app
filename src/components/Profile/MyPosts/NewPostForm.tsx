import {InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {fieldComponent, GetStringKeys, Textarea} from "../../common/formsControl";
import {maxTextLength, required} from "../../../utilits/validators/validators";
import {MyPostsFormValuesType} from "./MyPosts";

const maxLength100 = maxTextLength(100);
type PostFormKeysType = GetStringKeys<MyPostsFormValuesType>

const NewPostComponent: React.FC<InjectedFormProps<MyPostsFormValuesType>> = (props) => {

    return <form onSubmit={props.handleSubmit}>
        <div>
            {fieldComponent<PostFormKeysType>(Textarea,'newPostText', 'Add your post...', [maxLength100], undefined, undefined)}
        </div>
        <div>
            <button>Add Post</button>
        </div>
    </form>
}

export const NewPostForm = reduxForm<MyPostsFormValuesType>({form: 'newPost'})(NewPostComponent);
