import NetlifyAPI from 'netlify'

/* Function to handle netlify auth callback */
exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  const token = data.token
  
  try {
    /* 1. Create netlify deploy key `createNetlifyDeployKey` */
    const client = new NetlifyAPI(token)

    const sites = await client.listSites()

    /* Take the grant code and exchange for an accessToken */
    return {
      statusCode: 200,
      body: JSON.stringify(sites)
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message,
      })
    }
  }  
}