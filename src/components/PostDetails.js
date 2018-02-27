import React from 'react';
import {
	getComments,
	getPost,
	votePost,
	deletePost,
	voteCommentAction,
    deleteCommentAction,
	editCommentAction,
	addCommentAction
} from '../actions/ReadableActions';
import {connect} from "react-redux";
import Post from '../components/Post';
import Comment from "./Comment";

class PostDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			postBeingEdited: null,
			commentText: '',
			commentAuthor: ''
		};

		this.addNewComment = this.addNewComment.bind(this);
	}
	componentDidMount() {
		this.props.getPost(this.props.id);
        this.props.getComments(this.props.id);
	}

	editComment = (id) => {
		this.setState({
			postBeingEdited: id
		});
	}

	onEditComment = (id, comment) => {
		this.setState({
			postBeingEdited: null
		});
		this.props.editCommentAction(id, {timestamp: Date.now(), body: comment});
	}

	addNewComment = (e) => {
		e.preventDefault();
		const timestamp = Date.now();
		this.props.addCommentAction({
			id: timestamp.toString(),
			timestamp: timestamp,
			body: this.state.commentText,
			author: this.state.commentAuthor,
			parentId: this.props.id
		});
		this.setState({
			commentText: '',
			commentAuthor: ''
		});
	}

	handleChange(value, type) {
		switch(type) {
			case 'text':
				this.setState({
					commentText: value
				});
				break;
			case 'author':
				this.setState({
					commentAuthor: value
				});
				break;
			default:
				break;
		}
	}

    render() {
		const {post, comments} = this.props;
        return(
        	<div>
				<div>In Post Details view</div>
				{post && (post.deleted || !post.id)
					? <div>This post is deleted</div>
					: <Post
						post={post}
						isDetailedPost={true}
						upVote={() => this.props.votePost(post.id, 'upVote')}
						downVote={() => this.props.votePost(post.id, 'downVote')}
						deletePost={() => this.props.deletePost(post.id)}
					/>}
					<div className='new-comment'>
						Add new comment
						<form onSubmit={this.addNewComment}>
		                    <label>
		                        Body:
		                        <input required={true} type='text' value={this.state.commentText} onChange={(e) => this.handleChange(e.target.value, 'text')}/>
		                    </label>
		                    <label>
		                        Author:
		                        <input required={true} type='text' value={this.state.commentAuthor} onChange={(e) => this.handleChange(e.target.value, 'author')}/>
		                    </label>
		                    <input type='submit' value='Submit'/>
		                </form>
					</div>
					<h1>Comments</h1>
					<div className='comments'>
	                    {comments && comments.map((comment) => (
							<Comment key={comment.id}
								comment={comment}
								upVote={() => this.props.voteCommentAction(comment.id, 'upVote')}
								downVote={() => this.props.voteCommentAction(comment.id, 'downVote')}
								deleteComment={() => this.props.deleteCommentAction(comment.id)}
								editComment = {() => this.editComment(comment.id)}
								isBeingEdited= {this.state.postBeingEdited === comment.id}
								onEditComment={(id, comment) => this.onEditComment(id, comment)}
							/>
						))}
					</div>
			</div>
        );
    }
}

export default connect(
	(state, ownProps) => ({
        post: state.postDetailsReducer.post,
		comments: state.postDetailsReducer.comments
	}),
	{
		getPost,
		getComments,
		votePost,
		deletePost,
        voteCommentAction,
        deleteCommentAction,
		editCommentAction,
		addCommentAction
	}
)(PostDetails);
