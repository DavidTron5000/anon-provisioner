import React, { Component } from 'react'
import AppLayout from '../../fragments/AppLayout'

export default class Profile extends Component {

  render() {
    const { user } = this.props

    if (!user) {
      return <div>Loading</div>
    }

    return (
      <AppLayout>
        <div>
          <h2>User data from JWT</h2>
          <pre>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </AppLayout>
    )
  }
}
