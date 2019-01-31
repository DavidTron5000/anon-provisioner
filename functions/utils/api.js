import fetch from 'node-fetch'

export async function createNetlifyDeployKey(config, apiToken) {
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

export async function deleteNetlifyDeployKey(id, apiToken) {
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

export async function createNetlifySite(config, apiToken) {
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

export async function updateNetlifySite(id, config, apiToken) {
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

export async function deleteNetlifySite(id, apiToken) {
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

export async function createNetlifyWebhook(config, netlifyApiToken) {
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

export async function deleteNetlifyWebhook(hookId, apiToken) {
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
