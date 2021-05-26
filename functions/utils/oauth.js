const simpleOauth = require('simple-oauth2')
/* process.env.URL from netlify BUILD environment variables */
const siteUrl = process.env.URL || 'http://localhost:3000'

const TOKEN_HOST = 'https://api.netlify.com'
const USER_PROFILE_URL = 'https://api.netlify.com/api/v1/user'
const AUTHORIZATION_URL = 'https://app.netlify.com/authorize'
const TOKEN_URL = 'https://api.netlify.com/oauth/token'

const clientIdVar = 'NETLIFY_OAUTH_CLIENT_ID'
const clientSecretVar = 'NETLIFY_OAUTH_CLIENT_SECRET'

const config = {
  /* values set in terminal session or in netlify environment variables */
  clientId: process.env[clientIdVar],
  clientSecret: process.env[clientSecretVar],
  /* Intercom oauth API endpoints */
  tokenHost: TOKEN_HOST,
  authorizePath: AUTHORIZATION_URL, //`${intercomApi}/oauth`,
  tokenPath: TOKEN_URL, //`${intercomApi}/auth/eagle/token`,
  profilePath: USER_PROFILE_URL, // `${intercomApi}/me/`,
  /* redirect_uri is the callback url after successful signin */
  redirect_uri: `${siteUrl}/.netlify/functions/auth-callback`,
}

function authInstance(credentials) {
  if (!credentials.client.id) {
    throw new Error(`MISSING REQUIRED ENV VARS. Please set ${clientIdVar}`)
  }
  if (!credentials.client.secret) {
    throw new Error(`MISSING REQUIRED ENV VARS. Please set ${clientSecretVar}`)
  }
  // return oauth instance
  return simpleOauth.create(credentials)
}

/* Create oauth2 instance to use in our two functions */
const instance = authInstance({
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath
  }
})

module.exports = {
  oauth2: instance,
  config,
}