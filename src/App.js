import React, { Component } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import netlifyIdentity from 'netlify-identity-widget'
import NavBar from './fragments/NavBar'
import AppLayout from './fragments/AppLayout'
import Welcome from './pages/Welcome'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Main from './pages/Main'
import Demo from './pages/Demo'
import FeatureAdd from './pages/FeatureAdd'
import './App.css'

class App extends Component {
  componentDidMount() {
    /* Register listeners on identity widget events */
    netlifyIdentity.on('login', () => {
      /* Close netlify identity modal on login */
      netlifyIdentity.close()
      /* Grab user data */
      const user = netlifyIdentity.currentUser()
      console.log('login complete', user)
      window.location.href = window.location.href
    })
    netlifyIdentity.on('logout', () => {
      this.setState({ loggedIn: false })
      window.location.href = window.location.href
    })
  }
  handleLogIn = () => {
    netlifyIdentity.open()
  }
  handleLogOut = () => {
    netlifyIdentity.logout()
  }
  renderButton() {
    const user = netlifyIdentity.currentUser()
    if (!user) {
      return (
        <a href="#" onClick={ this.handleLogIn }>
          Sign up | Log in
        </a>
      )
    }
    return (
      <a href="#" onClick={this.handleLogOut}>
        Log out { user.email }
      </a>
    )
  }
  render() {
    const user = netlifyIdentity.currentUser()
    const props = this.props
    const navBar = (p) => <NavBar user={user} auth={netlifyIdentity} {...p} />
    const dashboardRedirect = (p) => <Redirect to={`/features`} />
    const profile = (p) => <Profile user={user} {...p} />

    return (
      <div className="App">
        <Route path="/" render={navBar} />
        <Route {...props} render={(p) => {
          // loading state
          // if (props.loading || props.location.pathname === '/callback') {
          //   return <Loading />
          // }

          // non-authed routes
          if (!user) {
            return (
              <Switch>
                <Route path={`/`} exact render={() => <Main {...props} />} />
                <Route path={`/demo`} exact render={() => <Demo {...props} />} />
                <Route render={() => <PleaseLogin logIn={this.logIn} {...props} />} />
              </Switch>
              
            )
          }

          // Protected routes
          return (
            <Switch>
              <Route path={`/`} exact render={() => <Main {...props} user={user} />} />
              <Route path={`/add`} exact component={FeatureAdd} />
              {/* <Route path={`/features/:id/edit`} component={FeatureEdit} />
               <Route path={`/features/:id`} component={FeatureView} /> */}
              <Route path={`/profile`} render={profile} />
              {/* <Redirect to={`/`} /> */}
              <Route component={NotFound} />
            </Switch>
          )
        }}
        />
      </div>
    )
  }
}

export default withRouter(App)

const PleaseLogin = (props) => {
  const path = props.location.pathname
  // if known protected routes, ask for login.
  if (path.match(/profile/) || path.match(/add/)) {
    return (
      <AppLayout>
        <h3>You must be logged in to view this page</h3>
        <button className="grey-btn" onClick={() => { netlifyIdentity.open() }}>
          Log In
        </button>
      </AppLayout>
    )
  }
  // else show 404
  return <NotFound {...props} />
}
