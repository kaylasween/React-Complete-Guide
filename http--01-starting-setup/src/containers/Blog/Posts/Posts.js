import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from '../../../axios'

import './Posts.css'

import FullPost from '../FullPost/FullPost'
import Post from '../../../components/Post/Post'

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    console.log(this.props)
    axios
      .get('/posts')
      .then(response => {
        const posts = response.data.splice(0, 4)
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Kayla'
          }
        })

        this.setState({ posts: updatedPosts })
      })
      .catch(error => {
        console.log(error)
      })
  }

  postSelectedHandler = id => {
    // this.setState({ selectedPostId: id })
    this.props.history.push({ pathname: '/posts/' + id }) //navigating programatically
  }

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          // <Link to={'/' + post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            click={() => this.postSelectedHandler(post.id)}
          />
          // </Link>
        )
      })
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + '/:id'}
          exact
          component={FullPost}
        />
      </div>
    )
  }
}

export default Posts
