// import NetlifyAPI from 'netlify'
const { 
  createNetlifySite, 
  createNetlifyDeployKey, 
  createNetlifyBuildHook,
  enableNetlifyIdentity,
  addNetlifySnippet
} = require('./utils/netlify')
const { createDeployKey } = require('./utils/github')
const { NETLIFY_DEPLOY_KEY_ID, NETLIFY_API_TOKEN } = process.env

/* Function to handle netlify auth callback */
exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  const token = body.token || NETLIFY_API_TOKEN
  const netlifyDeployKey = body.netlifyDeployKey || NETLIFY_DEPLOY_KEY_ID
  const sessionId = body.sessionId || uuidv4()
  const repoName = body.repoName || 'DavidTron5000/explorer-demo'
  const apiUrl = body.apiUrl
  const apiKey = body.apiKey

  try {

    /* 1. Create netlify deploy key `createNetlifyDeployKey` */
    // const netlifyDeployKey = await createNetlifyDeployKey({}, token)
    // console.log('netlifyDeployKey', netlifyDeployKey)
  
    /* 2. Then add key to github repo https://api.github.com/repos/owner/repoName/keys */
    // const githubDeployKey = await createDeployKey({
    //   repo: repoName,
    //   key: netlifyDeployKey.public_key,
    //   token: process.env.GITHUB
    // })
   
    console.log('deployKey', netlifyDeployKey)
    // Payload for Netlify create site
    const siteConfig = {
      // created_via: 'aws_cloudformation',
      session_id: sessionId,
      repo: {
        // deploy_key_id: netlifyDeployKey.id,
        deploy_key_id: netlifyDeployKey,
        public_repo: true,
        repo_branch: 'master',
        repo_path: repoName,
        repo_type: 'git',
        repo_url: `https://github.com/${repoName}`,
        provider: 'github',
        allowed_branches: ['master'],
      }
    }

    // Set site name
    // if (name) {
    //   siteConfig.name = name
    // }

    const netlifySite = await createNetlifySite(siteConfig, token)
    const siteId = netlifySite.site_id
    console.log('netlifySite', netlifySite)

    /* Create a build hook */
    const netlifyBuildHook = await createNetlifyBuildHook(siteId , {
      title: "Anon site updater hook",
      branch: "master"
    }, token)
     console.log('netlifyBuildHook', netlifyBuildHook)

    /* Enable Netlify identity for site */
    const identityInfo = await enableNetlifyIdentity(siteId, token)

    /* Inject variables to site */

    const snippetInfo = await addNetlifySnippet(siteId, {
      title: 'config-values',
      html: `<script>
var apiUrl = '${apiUrl}';
var apiKey = '${apiKey}';
</script>`
    }, token)
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        sessionId: sessionId,
        site: netlifySite,
        hook: netlifyBuildHook,
        identity: identityInfo,
        snippet: snippetInfo,
        curl: `curl -X POST -d {} https://api.netlify.com/build_hooks/${netlifyBuildHook.id}`
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