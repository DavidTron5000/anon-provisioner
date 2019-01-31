
/* Protected function */
exports.handler = function(event, context, callback) {
  console.log('protected function!')
  // Reading the context.clientContext will give us the current user
  const claims = context.clientContext && context.clientContext.user
  console.log('claims', claims)
  if (!claims) {
    console.log('No claims! Begone!')
    return callback(null, {
      statusCode: 401,
      body: JSON.stringify({
        data: 'NOT ALLOWED'
      })
    })
  }
  console.log('User is allowed. Let them in')

  /*
    Do fancy stuff here
  */

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: 'SECRET STUFFFFFFFFFFFFFF OOOOOOOooooooooooo'
    })
  })
}
