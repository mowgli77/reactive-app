import React from "react";
import mypost from './MyPosts.module.css'
import Post from "./Post/Post";
import {NewPostForm} from "./NewPostForm";
import {useDispatch, useSelector} from "react-redux";
import {getNewPostSelector, getPostsSelector} from "../../../redux/profileSelectors";
import {profileActions} from "../../../redux/profileReducer";


const onAddPost = profileActions.onAddPost

const MyPosts: React.FC = React.memo(() => {
    const posts = useSelector(getPostsSelector)
    const newPost = useSelector(getNewPostSelector)
    const dispatch = useDispatch()

    let postElements =
        [...posts]
            .reverse()
            .map(p => <Post message={p.message}
                            likesCount={p.likesCount} id={p.id} key={p.id}/>);

    let addPost = (values: MyPostsFormValuesType) => {
        if (values.newPostText && values.newPostText.trim().length > 0) {
            dispatch(onAddPost(values.newPostText))
            newPost.values.newPostText = ''
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

export default MyPosts

export type MyPostsFormValuesType = {
    newPostText: string
}
