import {
    DELETE_POST,
    EDIT_POST,
    GET_COMMENTS,
    POST_DETAILS,
    VOTE_POST,
    VOTE_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    ADD_COMMENT
} from "../actions/ReadableActions";

const INIT_STATE = {
    post: {},
    comments: []
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case POST_DETAILS:
            return {...state, post: action.data};
        case GET_COMMENTS:
            return {...state, comments: action.data};
        case VOTE_POST:
        case DELETE_POST:
        case EDIT_POST:
            return {...state, post: state.post.id === action.data.id ? action.data : state.post};
        case DELETE_COMMENT:
        case VOTE_COMMENT:
        case EDIT_COMMENT:
            return {...state, comments: state.comments.map(comment => {
                return comment.id === action.data.id
                    ? action.data
                    : comment
            })};
        case ADD_COMMENT:
            return {...state, comments: [...state.comments, action.data]};
        default:
            return state;
    }
};
