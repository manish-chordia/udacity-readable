import React from 'react';

//Icons
import editIcon from '../icons/edit.svg';
import deleteIcon from '../icons/delete_icon.svg';
import thumbsUpIcon from '../icons/thumbs-up.svg';
import thumbsDownIcon from '../icons/thumb-down.svg';

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            commentText: this.props.comment.body
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value) {
        this.setState({
            commentText: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onEditComment(this.props.comment.id, this.state.commentText);
    }

    render() {
        const {comment, upVote, downVote, deleteComment, editComment, isBeingEdited} = this.props;
        if(comment.deleted || comment.parentDeleted){
            return null;
        }
        else if(isBeingEdited) {
            return(
                <form className='comment' onSubmit={this.handleSubmit}>
                    <label>
                        Body: <input required={true} type='text' value={this.state.commentText} onChange={(e) => this.handleChange(e.target.value)}/>
                    </label>
                    <input type='submit' value='Submit'/>
                </form>
            );
        }
        return (
            <div className='comment'>
                <div>Body: {comment.body}</div>
                <div>Author: {comment.author}</div>
                <div>VoteCount: {comment.voteScore}</div>
                <div className='icons'>
                    <img className='icon' src={thumbsUpIcon} onClick={() => upVote()} alt='up vote'/>
                    <img className='icon' src={thumbsDownIcon} onClick={() => downVote()} alt='down vote'/>
                    <img className='icon' src={editIcon} alt='edit' onClick={() => editComment()}/>
                    <img className='icon' src={deleteIcon} alt='delete' onClick={() => deleteComment()}/>
                </div>
            </div>
        );
    };
}

export default Comment;
