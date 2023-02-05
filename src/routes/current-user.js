
function checkCurrentUser(secret, session) {
  if (!session) {
    return false;
  }
  const isCurrentUser = secret.user_id === session.user_id;
  return isCurrentUser;
}

module.exports = { checkCurrentUser };