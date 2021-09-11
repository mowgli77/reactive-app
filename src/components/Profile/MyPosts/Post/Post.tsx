import React, {useState} from "react";
import post from './Post.module.css'
import {PostPropsType} from "../../../../types/types";
import {profileActions} from "../../../../redux/profileReducer";
import {useDispatch} from "react-redux";

const addLikesCount = profileActions.addLikesCount
const deletePost = profileActions.deletePost

const Post: React.FC<PostPropsType> = (props) => {

    const [doNotLikeAgain, setDoNotLikeAgain] = useState(false);

    const dispatch = useDispatch()

    const liker = (id: number) => {
        setDoNotLikeAgain(true);
        dispatch(addLikesCount(id))
    }

    return (
        <div className={post.item}>
            <div className={post.img}>
                <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxnx51wr0ZzTAe6ddBhk3sYdo2FoNa1Ix-yw&usqp=CAU`}/>
            </div>
            <div className={post.text}>
                {props.message}
            </div>
            <span className={post.like}>
                <button disabled={doNotLikeAgain} onClick={() => liker(props.id)}><strong>Like &nbsp;</strong>
                    <i className={`${post.tiny} material-icons`}>thumb_up</i></button>
                &nbsp;
                <strong>{props.likesCount}</strong>
            </span>
            <div className={post.delete}>

                <button onClick={() => dispatch(deletePost(props.id))}><strong>Delete &nbsp;</strong>
                    <i className={`${post.tiny} material-icons`}>delete</i></button>
            </div>
        </div>
    )
}

export default Post