import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AppPost from './components/AddPost';

//components
import Root from './components/Root'
import PostDetails from "./components/PostDetails";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/addPost/:id?' render={({match}) => (<AppPost id={match.params.id}/>)}/>
                        <Route exact path='/:category?' render={({match}) => (<Root category={match.params.category}/>)}/>
                        <Route exact path='/:category/:id' render={({match}) => (<PostDetails id={match.params.id}/>)}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
