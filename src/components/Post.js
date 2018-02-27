import React from 'react';

//Icons
import editIcon from '../icons/edit.svg';
import deleteIcon from '../icons/delete_icon.svg';
import thumbsUpIcon from '../icons/thumbs-up.svg';
import thumbsDownIcon from '../icons/thumb-down.svg';
import {Link} from "react-router-dom";

const Post = ({post, isDetailedPost, upVote, downVote, deletePost}) => {
    if(post){
        return (
            <div className='post'>
                <div>Title: {post.title}</div>
                {isDetailedPost ? <div>Body: {post.body}</div> : null}
                <div>Author: {post.author}</div>
                {isDetailedPost ? <div>Category: {post.category}</div> : null}
                <div>VoteCount: {post.voteScore}</div>
                <div>CommentCount: {post.commentCount}</div>
                <div className='icons'>
                    <img className='icon' src={thumbsUpIcon} onClick={() => upVote()} alt='up vote'/>
                    <img className='icon' src={thumbsDownIcon} onClick={() => downVote()} alt='down vote'/>
                    <Link to={`/addPost/${post.id}`}>
                        <img className='icon' src={editIcon} alt='edit'/>
                    </Link>
                    <img className='icon' src={deleteIcon} alt='delete' onClick={() => deletePost()}/>
                    {!isDetailedPost ? <Link to={`/${post.category}/${post.id}`}>Details</Link> : null}
                </div>
            </div>
        );
    }
    else {
        return null;
    }
};

export default Post;