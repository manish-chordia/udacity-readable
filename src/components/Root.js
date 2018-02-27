import React from 'react'
import connect from "react-redux/es/connect/connect";
import {Link} from 'react-router-dom'
import {getAllCategories, getAllPosts, sortAllPosts, votePost, deletePost} from "../actions/ReadableActions";
import {filterByCategory, sortPosts} from "../reducers/postReducer";
import {SORTING_TYPES} from "../utils/constants";
import Post from './Post';

class Root extends React.Component {
    componentDidMount() {
        this.props.getAllCategories();
        this.props.getAllPosts();
    }

    onFilterSelect = (filter) => {
        this.props.sortAllPosts(filter);
    };

    render() {
        return (
            <div className='root'>
                <div className='category-box'>
                    <div className='category-title'>Categories</div>
                    <div className='categories'>
                        <Link className={`category ${!this.props.category ? 'selected' : ''}`} to='/'>All</Link>
                        {this.props.allCategories.map((item, key) => (
                            <Link className={`category ${this.props.category === item.name ? 'selected' : ''}`} key={key} to={item.path}>{item.name}</Link>
                        ))}
                    </div>
                </div>

                <div className='category-box'>
                    <div className='category-title'>Filters</div>
                    <div className='categories'>
                        {SORTING_TYPES.map((item, key) => (
                            <div className={`category ${this.props.filter === item.type ? 'selected' : ''}`}
                                 onClick={() => this.onFilterSelect(item.type)} key={key}>
                                {item.text}
                            </div>
                        ))}
                    </div>
                </div>

                <Link to={'/addPost'}>Add new Post</Link>
                <div className='posts-box'>
                    <div className='posts-title'>Posts</div>
                    <div className='posts'>
                        {this.props.posts.map((item) => {
                            if(item.deleted) {
                                return null;
                            }
                            else {
                                return (
                                    <Post
                                        post={item}
                                        key={item.id}
                                        isDetailedPost={false}
                                        upVote={() => this.props.votePost(item.id, 'upVote')}
                                        downVote={() => this.props.votePost(item.id, 'downVote')}
                                        deletePost={() => this.props.deletePost(item.id)}
                                    />
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        allCategories: state.postReducer.categories,
        filter: state.postReducer.filter,
        posts: sortPosts(filterByCategory(state.postReducer.posts, ownProps.category), state.postReducer.filter)
    }),
    {
        getAllCategories,
        getAllPosts,
        sortAllPosts,
        votePost,
        deletePost
    }
)(Root);