// import NetlifyAPI from 'netlify'
import { createNetlifyDeployKey, createNetlifySite } from './utils/api'
import { createDeployKey } from './utils/github'

/* Function to handle netlify auth callback */
exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  const token = data.token
  
  try {
    /* 1. Create netlify deploy key `createNetlifyDeployKey` */
    const netlifyDeployKey = await createNetlifyDeployKey({}, token)

    const repoName = 'DavidTron5000/my-site'
    /* 2. Then add key to github repo https://api.github.com/repos/owner/repoName/keys */
    const githubDeployKey = await createDeployKey({
      repo: repoName,
      key: netlifyDeployKey.public_key,
      token: process.env.GITHUB
    })

    const sessionId = uuidv4()
    // Payload for Netlify create site
    const siteConfig = {
      // created_via: 'aws_cloudformation',
      session_id: sessionId,
      repo: {
        deploy_key_id: netlifyDeployKey.id,
        public_repo: true,
        repo_branch: 'master',
        repo_path: repoName,
        repo_type: 'git',
        repo_url: 'https://github.com/DavidTron5000/my-site',
        provider: 'github',
        allowed_branches: ['master'],
      }
    }

    // Set site name
    // if (name) {
    //   siteConfig.name = name
    // }

    const netlifySite = await createNetlifySite(siteConfig, token)


    console.log('netlifySite', netlifySite)
    /* Take the grant code and exchange for an accessToken */
    return {
      statusCode: 200,
      body: JSON.stringify({
        sessionId: sessionId,
        site: netlifySite
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

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}