import React, { Component } from 'react'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'

import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'
// import NotFound from './404'
// import FullPost from './FullPost/FullPost'
import './Blog.css'

class Blog extends Component {
  state = {
    auth: true
  }

  render() {
    return (
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts/" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={{ pathname: '/new-post' }}>New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" exact component={NewPost} />
          ) : null}
          <Route path="/posts/" component={Posts} />
          {/* <Route component={NotFound} /> */}
          <Redirect from="/" to="/posts" />
          {/* Redirect from route won't work with 404 solution above*/}
          {/* :id goes after new-post
          because new-post can be interpreted as an id */}
        </Switch>
      </div>
    )
  }
}

export default Blog
