import React from 'react'
import AppLayout from '../../fragments/AppLayout'

export default class Main extends React.Component {
  render() {
    const { user } = this.props
    let contents = (
      <div>
        Login
      </div>
    )
    if (user) {
      contents = (
        <a href="/.netlify/functions/auth-start">
          Netlify auth link
        </a>
      )
    }

    return (
      <AppLayout>
        <div>
          {contents}
        </div>
      </AppLayout>
    )
  }
}
