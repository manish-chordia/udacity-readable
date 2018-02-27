import React from 'react';
import {editAPost, addNewPost, getPost} from '../actions/ReadableActions';
import {connect} from "react-redux";

class AddPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            author: '',
            category:''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.id) {
            this.props.getPost(this.props.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.post) {
            this.setState({
                title: nextProps.post.title,
                body: nextProps.post.body
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.props.id) {
            this.props.editAPost(this.props.id, {title: this.state.title, body: this.state.body})
                .then(() => window.history.back())
        }
        else {
            if(this.state.category === "") {
                alert("please select a category");
            }
            else {
                const timeStamp = Date.now();
                this.props.addNewPost({
                    title: this.state.title,
                    body: this.state.body,
                    author: this.state.author,
                    category: this.state.category,
                    id: timeStamp.toString(),
                    timestamp: timeStamp
                })
                    .then(() => window.history.back());
            }
        }
    }

    handleChange(value, type) {
        switch(type){
            case 'title':
                this.setState({title: value});
                break;
            case 'body':
                this.setState({body: value});
                break;
            case 'author':
                this.setState({author: value});
                break;
            case 'category':
                this.setState({category: value});
                break;
            default:
                break;
        }
    }

    render () {
        return (
            <div className='add-post'>
                {this.props.id
                    ? <h1>Edit your post</h1>
                    : <h1>Add a new Post</h1>
                }
                <form className='post-form' onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input required={true} type='text' value={this.state.title} onChange={(e) => this.handleChange(e.target.value, 'title')}/>
                    </label>
                    <label>
                        Body:
                        <input required={true} type='text' value={this.state.body} onChange={(e) => this.handleChange(e.target.value, 'body')}/>
                    </label>
                    {!this.props.id ? <label>
                        Author:
                        <input required={true} type='text' value={this.state.author} onChange={(e) => this.handleChange(e.target.value, 'author')}/>
                    </label> : null}
                    {!this.props.id ? <label>
                        Category:
                        {this.props.allCategories.length
                            ? <select required={true} defaultValue={'--select a category--'} onChange={(e) => this.handleChange(e.target.value, 'category')}>
                                <option disabled value={'--select a category--'}>--select a category--</option>
                                {this.props.allCategories.map((category, key) => (
                                    <option value={category.name} key={key}>{category.name}</option>
                                ))}
                            </select>
                            : <input required={true} type='text' value={this.state.category} onChange={(e) => this.handleChange(e.target.value, 'category')}/>
                        }
                    </label> : null}
                    <input className='submit-button' type='submit' value='Submit'/>
                </form>
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        post: state.postDetailsReducer.post,
        allCategories: state.postReducer.categories,
    }),
    {
        editAPost,
        addNewPost,
        getPost
    }
)(AddPost)