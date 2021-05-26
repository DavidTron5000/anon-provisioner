const fetch = require('node-fetch')

async function createNetlifyDeployKey(config, apiToken) {
  console.log('Creating Netlify deploy key')
  const url = 'https://api.netlify.com/api/v1/deploy_keys/'
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(config),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`
    }
  })
  return await response.json() // eslint-disable-line
}

async function deleteNetlifyDeployKey(id, apiToken) {
  console.log('Deleting Netlify deploy key')
  const url = `https://api.netlify.com/api/v1/deploy_keys/${id}`
  const response = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify({
      key_id: id
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`
    }
  })

  // response.ok
  if (response.status === 404) {
    console.log('DeployKey already deleted')
  }

  if (response.status === 204) {
    console.log('DeployKey deleted!')
  }

  return response
}

async function createNetlifySite(config, apiToken) {
  console.log('Creating Netlify site')
  const url = 'https://api.netlify.com/api/v1/sites/'
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(config),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`
    }
  })
  return await response.json() // eslint-disable-line
}

async function updateNetlifySite(id, config, apiToken) {
  console.log('Update Netlify site')
  const url = `https://api.netlify.com/api/v1/sites/${id}`
  const settings = config || {}
  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(settings),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`
    }
  })
  return await response.json() // eslint-disable-line
}

async function deleteNetlifySite(id, apiToken) {
  console.log('Deleting Netlify site')
  const url = `https://api.netlify.com/api/v1/sites/${id}`
  const response = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify({
      site_id: id
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`
    }
  })

  // response.ok

  if (response.status === 404) {
    console.log('Site already deleted')
  }

  if (response.status === 204) {
    console.log('Site deleted!')
  }

  return response
}

async function createNetlifyWebhook(config, netlifyApiToken) {
  console.log('Creating Netlify webhook')
  const url = 'https://api.netlify.com/api/v1/hooks'
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(config),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${netlifyApiToken}`
    }
  })

  const data = await response.json()

  if (response.status === 422) {
    throw new Error(`Error in createNetlifyWebhook ${JSON.stringify(data)}`)
  }

  return data
}

async function deleteNetlifyWebhook(hookId, apiToken) {
  console.log('Deleting Netlify webhook', hookId)
  const url = `https://api.netlify.com/api/v1/hooks/${hookId}`
  const response = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify({
      hook_id: hookId
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`
    }
  })

  // response.ok
  if (response.status === 404) {
    console.log('Webhook already deleted')
  }

  if (response.status === 204) {
    console.log('Deleted Netlify webhook')
  }

  return response
}

/*
input
{"title":"Trigger Me Hook","branch":"master"}
*/
async function createNetlifyBuildHook(siteId, config, netlifyApiToken) {
  console.log('Creating Netlify build webhook')
  const url = `https://api.netlify.com/api/v1/sites/${siteId}/build_hooks`
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(config),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${netlifyApiToken}`
    }
  })

  const data = await response.json()

  if (response.status === 422) {
    throw new Error(`Error in createNetlifyBuildhook ${JSON.stringify(data)}`)
  }

  return data
}

async function getNetlifyBuildHook(siteId, netlifyApiToken) {
  console.log('Get Netlify build webhook')
  const url = `https://api.netlify.com/api/v1/sites/${siteId}/build_hooks`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${netlifyApiToken}`
    }
  })

  const data = await response.json()

  if (response.status === 422) {
    throw new Error(`Error in createNetlifyBuildhook ${JSON.stringify(data)}`)
  }

  return data
}

async function deleteNetlifyBuildHook(siteId, hookId, apiToken) {
  console.log('Deleting Netlify build webhook', hookId)
  const url = `https://api.netlify.com/api/v1/sites/${siteId}/build_hooks/${hookId}`
  const response = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify({
      hook_id: hookId
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`
    }
  })

  // response.ok
  if (response.status === 404) {
    console.log('Webhook already deleted')
  }

  if (response.status === 204) {
    console.log('Deleted Netlify Build Hook')
  }

  return response
}

// https://api.netlify.com/api/v1/sites/11111111-e8d9-46ec-ba0a-ece23fad9c74/identity
async function enableNetlifyIdentity(siteId, netlifyApiToken) {
  console.log('Creating Netlify identity')
  const url = `https://api.netlify.com/api/v1/sites/${siteId}/identity`
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${netlifyApiToken}`
    }
  })

  const data = await response.json()

  if (response.status === 422) {
    throw new Error(`Error in enableNetlifyIdentity ${JSON.stringify(data)}`)
  }

  return data
}

// https://api.netlify.com/api/v1/sites/1111111-e8d9-46ec-ba0a-ece23fad9c74/snippets
async function addNetlifySnippet(siteId, config, netlifyApiToken) {
  console.log('Add Netlify snippet')
  const url = `https://api.netlify.com/api/v1/sites/${siteId}/snippets`
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      general_position: config.position || "head", 
      title: config.title || "Demo snippets",
      general: config.html
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${netlifyApiToken}`
    }
  })

  const data = await response.json()

  if (response.status === 422) {
    throw new Error(`Error in addNetlifySnippet ${JSON.stringify(data)}`)
  }

  return data
}

async function getNetlifySnippets(config, netlifyApiToken) {
  console.log('Get Netlify snippets')
  const url = `https://api.netlify.com/api/v1/sites/${config.siteId}/snippets`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${netlifyApiToken}`
    }
  })

  const data = await response.json()

  if (response.status === 422) {
    throw new Error(`Error in createNetlifyBuildhook ${JSON.stringify(data)}`)
  }
  /*
  [{"id":"0",
    "title":"Values",
    "general":"\u003cscript\u003e\nvar xyz = 'yes';\n\u003c/script\u003e",
    "general_position":"head",
    "goal":null,
    "goal_position":"footer"
    }]
  */
  if (config.title) {
    return data.find((d) => {
      return d === config.title
    })
  }

  return data
}

module.exports = {
  createNetlifyDeployKey,
  deleteNetlifyDeployKey,
  createNetlifySite,
  updateNetlifySite,
  deleteNetlifySite,
  // Github notification hooks
  createNetlifyWebhook,
  deleteNetlifyWebhook,
  // Build hooks
  createNetlifyBuildHook,
  getNetlifyBuildHook,
  deleteNetlifyBuildHook,
  // Turn on identity
  enableNetlifyIdentity,
  // Add a snippet
  addNetlifySnippet,
  getNetlifySnippets,
}