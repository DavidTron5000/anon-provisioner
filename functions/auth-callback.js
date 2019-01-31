import NetlifyAPI from 'netlify'
import oauth2, { config } from './utils/oauth'

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
      const token = oauth2.accessToken.create(result)
      console.log('accessToken', token)
      return token
    })
    .then((token) => {
      const client = new NetlifyAPI(token.access_token)
      return client.listSites()
    })
    // Do stuff with user data & token
    .then((sites) => {
      // console.log('auth token', result.token)
      // // Do stuff with user data
      // console.log('user data', result.data)
      // Do other custom stuff
      console.log('sites', sites)
      // return results to browser
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(sites)
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