import React from 'react'

const AuthButton = ({ auth, user }) => {
  const handler = (user) ? auth.logout : auth.open
  const text = (user) ? 'Log Out' : 'Log in'
  return (
    <button style={{ marginLeft: 20 }} onClick={() => handler()}>
      {text}
    </button>
  )
}

export default AuthButton