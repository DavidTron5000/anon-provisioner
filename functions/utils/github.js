const fetch = require('node-fetch')

async function getRepoData(config) {
  console.log('Get github repo live info')
  const url = `https://api.github.com/repos/${config.repo}`

  const headers = {
    'Content-Type': 'application/json'
  }

  if (config.token) {
    headers.Authorization = `Bearer ${config.token}`
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: headers
  })
  return await response.json() // eslint-disable-line
}

async function createDeployKey(config) {
  console.log('Adding Netlify deploy key to Github repo')
  const url = `https://api.github.com/repos/${config.repo}/keys`
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title: 'Netlify Deploy Key',
      key: config.key,
      read_only: true
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.token}`
    }
  })
  return await response.json() // eslint-disable-line
}

async function deleteDeployKey(config) {
  console.log('Removing Netlify deploy key to github repo', config.id)
  const url = `https://api.github.com/repos/${config.repo}/keys/${config.id}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.token}`
    }
  })

  if (response.status === 404) {
    console.log('GithubDeployKey already deleted')
  }

  if (response.status === 204) {
    console.log('Deleted GithubDeployKey')
  }

  return response
}

async function createWebhook(config) {
  console.log('Creating Github webhook')
  const url = `https://api.github.com/repos/${config.repo}/hooks`
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name: 'web',
      active: true,
      events: ['delete', 'push', 'pull_request'],
      config: {
        url: 'https://api.netlify.com/hooks/github',
        content_type: 'json'
      }
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.token}`
    }
  })
  return await response.json() // eslint-disable-line
}

async function deleteWebhook(config) {
  console.log('Deleting Github webhook', config.hookId)
  const url = `https://api.github.com/repos/${config.repo}/hooks/${config.hookId}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.token}`
    }
  })
  return response
}

module.exports = {
  getRepoData,
  createDeployKey,
  deleteDeployKey,
  createWebhook,
  deleteWebhook
}