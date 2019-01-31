import netlifyIdentity from 'netlify-identity-widget'

// Get JWT token of current user
function generateHeaders() {
  const headers = { 'Content-Type': 'application/json' }
  if (netlifyIdentity.currentUser()) {
    return netlifyIdentity.currentUser().jwt().then((token) => {
      return { ...headers, Authorization: `Bearer ${token}` }
    })
  }
  return Promise.resolve(headers)
}

export async function callProtectedEndpoint(functionName) {
  const authHeaders = await generateHeaders()

  // Set up an environment-specific path for lambda functions.
  let lambdaPath = `/.netlify/functions/${functionName}`
  if (window.location.hostname && window.location.hostname === 'localhost') {
    lambdaPath = `http://localhost:9000/${functionName}`
  }

  return fetch(lambdaPath, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      text: 'hi'
    })
  }).then((resp) => {
    return resp.json()
  }).then((data) => {
    alert(JSON.stringify(data))
  })
}
