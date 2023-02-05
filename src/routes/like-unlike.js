const { getSecret } = require('../model/secrets');
const {
    insertLike,
    updateLikeCount,
    removeLikeByUser,
} = require('../model/likes');
const { getSession } = require('../model/sessions');

function handleLikeButton(req, res) {
    const id = req.params.id;
    const secret = getSecret(id);
    const DBsession = getSession(req.session.id);
    insertLike(secret.id, DBsession.user_id);
    updateLikeCount(secret.id);
    res.redirect('/');
}

function handleUnlikeButton(req, res) {
    const id = req.params.id;
    const secret = getSecret(id);
    const DBsession = getSession(req.session.id);
    removeLikeByUser(secret.id, DBsession.user_id);
    updateLikeCount(secret.id);
    res.redirect('/');
}

module.exports = { handleLikeButton, handleUnlikeButton };
