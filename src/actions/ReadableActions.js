import {
	getCategories,
	getPosts,
	postVote,
    editPost,
	addANewPost,
    deleteThisPost,
	comments,
	getPostDetails,
    voteComment,
    deleteComment,
	editComment,
	addComment
} from '../utils/APIHelper'

export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';
export const SAVE_POSTS = 'SAVE_POSTS';
export const SORT_POSTS = 'SORT_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const EDIT_POST = 'EDIT_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const POST_DETAILS = 'POST_DETAILS';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';

//get all categories
const saveCategories = (categories) => {
	return {type: SAVE_CATEGORIES, data: categories};
};

export const getAllCategories = () => {
	return (dispatch) => {
		return getCategories()
			.then(categories => dispatch(saveCategories(categories)))
	};
};

//get all posts
const savePosts = (posts) => ({type: SAVE_POSTS, data: posts});

export const getAllPosts = () => {
	return (dispatch) => {
		getPosts()
			.then(posts => dispatch(savePosts(posts)))
	}
};

//sort Posts
export const sortAllPosts = (filter) => ({type: SORT_POSTS, data: filter});

//voting a post

const voteAPost = (post) => ({type: VOTE_POST, data: post});

export const votePost = (id, option) => {
	return (dispatch) => {
		postVote(id, option)
			.then(post => dispatch(voteAPost(post)))
	}
};

//edit existing post
const editedPost = (post) => ({type: EDIT_POST, data: post});

export const editAPost = (id, body) => {
	return (dispatch) => {
		return editPost(id, body)
			.then(post => dispatch(editedPost(post)))
	}
};

//add new Post
const addpost = (post) => ({type: ADD_POST, data: post});

export const addNewPost = (body) => {
	return (dispatch) => {
		return addANewPost(body)
			.then(post => dispatch(addpost(post)))
	}
};

//DELETE a post
const postDeleted = (post) => ({type: DELETE_POST, data: post});

export const deletePost = (id) => {
	return (dispatch) => {
		deleteThisPost(id)
			.then(post => dispatch(postDeleted(post)))
	};
};

//Get comments
const storeComments = (comments) => ({type: GET_COMMENTS, data: comments});

export const getComments = (id) => {
	return (dispatch) => {
		comments(id)
			.then(comments => dispatch(storeComments(comments)))
	};
};

//get post details
const storePostDetails = (post) => ({type: POST_DETAILS, data: post});

export const getPost = (id) => {
	return (dispatch) => {
		getPostDetails(id)
			.then(post => dispatch(storePostDetails(post)))
	};
};

//vote comment
const commentVoted = (comment) => ({type: VOTE_COMMENT, data: comment});

export const voteCommentAction = (id, option) => {
	return (dispatch) => {
		voteComment(id, option)
			.then(comment => dispatch(commentVoted(comment)))
	}
};

//delete comment
const commentDeleted = (comment) => ({type: DELETE_COMMENT, data: comment});

export const deleteCommentAction = (id) => {
    return (dispatch) => {
        deleteComment(id)
            .then(comment => dispatch(commentDeleted(comment)))
    };
};

//edit comment
const editCommentSuccess = (comment) => ({type: EDIT_COMMENT, data: comment})

export const editCommentAction = (id, body) => {
	return (dispatch) => {
		editComment(id, body)
			.then(comment => dispatch(editCommentSuccess(comment)))
	}
};

//add comment
const addCommentSuccess = (comment) => ({type: ADD_COMMENT, data: comment});

export const addCommentAction = (body) => {
	return (dispatch) => {
		addComment(body)
			.then(comment => dispatch(addCommentSuccess(comment)))
	}
}
