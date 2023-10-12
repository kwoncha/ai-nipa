function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.save(action);
}

function destroyUserAuthSession(req) {
  req.session.uid = null;
  req.session.isAuth = false;
}

module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession
};