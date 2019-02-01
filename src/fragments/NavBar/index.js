import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callProtectedEndpoint } from '../../utils/api'
import AuthButton from '../../components/AuthButton'

class NavBar extends Component {
  render() {
    const { auth, user } = this.props
    console.log('this.props', this.props)
    let leftNavContents = (
      <div>
        <Link to={`/profile/`}>
          Profile (protected)
        </Link>
      </div>
    )

    let rightNavContents = (
      <span className='right-nav-contents'>
        <Link to={`/demo/`}>
          Demo
        </Link>
        <AuthButton auth={auth} user={user} />
      </span>
    )

    if (user) {
      leftNavContents = (
        <span>
          <Link to={`/add/`}>
            Request a Feature
          </Link>
          <Link to={`/profile/`}>
            Profile
          </Link>
        </span>
      )
      rightNavContents = (
        <span>
          <Link to={`/profile/`}>
            Profile
          </Link>
          <AuthButton auth={auth} user={user} />
        </span>
      )
    }

    const leftNav = (
      <div className='navbar-left'>
        <Link className='navbar-logo' title='logo' to='/'>
          {/* <img alt='home' src="https://www.netlify.com/img/press/logos/full-logo-light.svg" /> */}
          Impossible Landing pages
        </Link>
      </div>
    )

    const rightNav = (
      <div className='navbar-right'>
        {rightNavContents}
      </div>
    )

    return (
      <div>
        <nav className='navbar'>
          {leftNav}
          {rightNav}
        </nav>
        <div className='navbar-spacer' />
      </div>
    )
  }
}

export default NavBar
