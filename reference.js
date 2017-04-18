function isAdmin (req, res, next) {
  if (req.user.isAdmin === true) return next()
  console.log("failed authentication")

  req.flash('flash', {
    type: 'error',
    message: 'You have to log in'
  })
  res.send('Error! You do not have access privileges')
}
