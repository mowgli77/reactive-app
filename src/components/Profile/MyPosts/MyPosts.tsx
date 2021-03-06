import React from "react";
import mypost from './MyPosts.module.css'
import Post from "./Post/Post";
import {NewPostForm} from "./NewPostForm";
import {MyPostsPropsType} from "../../../types/types";


const MyPosts: React.FC<MyPostsPropsType> = React.memo(props => {
    let postElements =
        [...props.posts]
            .reverse()
            .map(p => <Post addLikesCount={props.addLikesCount} deletePost={props.deletePost} message={p.message}
                            likesCount={p.likesCount} id={p.id} key={p.id}/>);

    let addPost = (values: MyPostsFormValuesType) => {
        if (values.newPostText && values.newPostText.trim().length > 0) {
            props.onAddPost(values.newPostText);
            props.newPost.values.newPostText = ''
        }
    }

    return (
        <div>
            <div className={mypost.post}>
                <NewPostForm onSubmit={addPost}/>
            </div>
            <div>
                {postElements}
            </div>
        </div>
    )
})

export default MyPosts;

export type MyPostsFormValuesType = {
    newPostText: string
}
