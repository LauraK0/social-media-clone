
function checkCurrentUser(secret, session) {
  const isCurrentUser = secret.user_id === session.user_id;
  return isCurrentUser;
}

module.exports = { checkCurrentUser };