// import NetlifyAPI from 'netlify'
import oauth2, { config } from './utils/oauth'
import fetch from 'node-fetch'

async function getUser(netlifyApiToken) {
  console.log('getUser')
  const url = `https://api.netlify.com/api/v1/user/`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${netlifyApiToken}`
    }
  })

  const data = await response.json()

  if (response.status === 422) {
    throw new Error(`Error ${JSON.stringify(data)}`)
  }

  return data
}

/* Function to handle netlify auth callback */
exports.handler = (event, context, callback) => {
  const code = event.queryStringParameters.code
  /* state helps mitigate CSRF attacks & Restore the previous state of your app */
  const state = event.queryStringParameters.state

  /* Take the grant code and exchange for an accessToken */
  oauth2.authorizationCode.getToken({
    code: code,
    redirect_uri: config.redirect_uri,
    client_id: config.clientId,
    client_secret: config.clientSecret
  })
    .then((result) => {
      const auth = oauth2.accessToken.create(result)
      console.log('auth', auth)
      return auth
    })
    .then((auth) => {
      const { token } = auth
      console.log(typeof token)
      console.log('token', token.access_token)
      return getUser(token.access_token)
    })
    // Do stuff with user data & token
    .then((user) => {
      // console.log('auth token', result.token)
      // // Do stuff with user data
      // console.log('user data', result.data)
      // Do other custom stuff
      console.log('user', user)
      // return results to browser
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(user)
      })
    })
    .catch((error) => {
      console.log('Access Token Error', error.message)
      console.log(error)
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message,
        })
      })
    })
}