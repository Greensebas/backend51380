
export function isUser(req, res, next) {
  if (req.session?.user.email) {
    return next()
  }
  return res.status(401).render('error', { error: 'Authentication error!' })
};

export function isAdmin(req, res, next) {
  if (req.session?.user.isAdmin) {
    return next()
  }
  return res.status(403).render('error', { error: 'Authorization error!' })
};
