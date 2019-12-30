import React, { Component } from 'react'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'

import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'
// import FullPost from './FullPost/FullPost'
import './Blog.css'

class Blog extends Component {
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
          <Route path="/new-post" exact component={NewPost} />
          <Route path="/posts/" component={Posts} />
          <Redirect from="/" to="/posts" />
          {/* :id goes after new-post
          because new-post can be interpreted as an id */}
        </Switch>
      </div>
    )
  }
}

export default Blog
