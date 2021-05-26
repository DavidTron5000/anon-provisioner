const { createDeployKey } = require('./utils/github')
const { createNetlifyDeployKey } = require('./utils/netlify')
const { GITHUB_API_TOKEN } = process.env

/* Connect a repo to netlify with a deploy key */
exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  const token = body.token
  const repoName = body.repoName
  const githubToken = body.githubToken || GITHUB_API_TOKEN
  
  try {
    /* 1. Create netlify deploy key `createNetlifyDeployKey` */
    const netlifyDeployKey = await createNetlifyDeployKey({}, token)
    console.log('netlifyDeployKey', netlifyDeployKey)

    /* 2. Then add key to github repo https://api.github.com/repos/owner/repoName/keys */
    const githubDeployKey = await createDeployKey({
      repo: repoName,
      key: netlifyDeployKey.public_key,
      token: githubToken
    })
    console.log('githubDeployKey', githubDeployKey)

    return {
      statusCode: 200,
      body: JSON.stringify({
        githubDeployKey: githubDeployKey,
        netlifyDeployKey: netlifyDeployKey,
      })
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