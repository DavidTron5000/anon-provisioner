const jwt = require('jsonwebtoken')
const { NETLIFY_OAUTH_CLIENT_ID, NETLIFY_OAUTH_CLIENT_SECRET } = process.env

module.exports = function getClaimUrl(sessionId) {
  const token = jwt.sign({
    client_id: NETLIFY_OAUTH_CLIENT_ID, 
    session_id: sessionId,
  }, NETLIFY_OAUTH_CLIENT_SECRET)

  const claimUrl = `https://app.netlify.com/claim#${token}`
  console.log("Link to claim your sites:")
  console.log(claimUrl)
  return claimUrl
}