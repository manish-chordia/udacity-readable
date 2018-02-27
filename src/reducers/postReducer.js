import {
	SAVE_CATEGORIES,
	SAVE_POSTS,
	SORT_POSTS,
	VOTE_POST,
    EDIT_POST,
	ADD_POST,
	DELETE_POST
} from '../actions/ReadableActions';
import {SORTING_TYPES} from "../utils/constants";

const INIT_STATE = {
	categories: [],
	posts: [],
	filter: SORTING_TYPES[0].type
};

export const sortPosts = (posts, filter) => {
	switch (filter) {
		case 'NEWEST':
			return posts.sort((a, b) => b.timestamp-a.timestamp);
		case 'OLDEST':
            return posts.sort((a, b) => a.timestamp-b.timestamp);
		case 'HIGH_SCORE':
            return posts.sort((a, b) => b.voteScore-a.voteScore);
		case 'LOW_SCORE':
            return posts.sort((a, b) => a.voteScore-b.voteScore);
		default:
			return posts;
	}
};

export const filterByCategory = (posts, category) => {
	return category ? posts.filter(post => (post.category === category)) : posts;
};

export default (state = INIT_STATE, action) => {
	switch(action.type){
		case SAVE_CATEGORIES:
			return {...state, categories: action.data.categories};
		case SAVE_POSTS:
			return Object.assign({}, state, {posts: action.data});
		case SORT_POSTS:
			return Object.assign({}, state, {filter: action.data});
        case VOTE_POST:
        case DELETE_POST:
		case EDIT_POST:
			return {...state, posts: state.posts.map(post => {
				return post.id === action.data.id
					? action.data
					: post
			})};
		case ADD_POST:
			return {...state, posts: [...state.posts, action.data]};
		default:
			return state;
	}
};