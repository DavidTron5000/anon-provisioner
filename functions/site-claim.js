import jwt from 'jsonwebtoken'

/* Function to handle netlify auth callback */
exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  const sessionId = data.session
  const token = jwt.sign({
    client_id: process.env.NETLIFY_OAUTH_CLIENT_ID, 
    session_id: sessionId,
  }, process.env.NETLIFY_OAUTH_CLIENT_SECRET)

  const claimUrl = `https://app.netlify.com/claim#${token}`
  console.log("Link to claim your sites:")
  console.log(claimUrl)

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: sessionId,
      claim: claimUrl
    })
  }
}