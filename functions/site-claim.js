const getClaimUrl = require('./utils/get-claim-url')

/* Function to handle netlify auth callback */
exports.handler = async (event) => {
  const body = JSON.parse(event.body)
  const sessionId = body.session
  const claimUrl = getClaimUrl(sessionId)

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: sessionId,
      claim: claimUrl
    })
  }
}