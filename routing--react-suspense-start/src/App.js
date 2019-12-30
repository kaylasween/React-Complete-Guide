import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, NavLink } from 'react-router-dom'

// import Posts from './containers/Posts'
import User from './containers/User'
import Welcome from './containers/Welcome'

const Posts = React.lazy(() => import('./containers/Posts'))
// const User = React.lazy(() => import('./containers/User'))

class App extends Component {
  state = {
    show: false
  }

  modeHandler = () => {
    this.setState(prevState => {
      return { show: !prevState.show }
    })
  }

  render() {
    return (
      <>
        <button onClick={this.modeHandler}>Toggle Mode</button>
        {this.state.show ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Posts />
          </Suspense>
        ) : (
          <User />
        )}
      </>
      // <BrowserRouter>
      //   <React.Fragment>
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     <Route path="/user" component={User} />
      //     <Route
      //       path="/posts"
      //       render={() => (
      //   <Suspense fallback={<div>Loading...</div>}>
      //   <Posts />
      // </Suspense>
      //       )}
      //     />
      //   </React.Fragment>
      // </BrowserRouter>
    )
  }
}

export default App
