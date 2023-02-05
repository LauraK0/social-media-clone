// update likes
const db = require('../database/db');

const insert_like = db.prepare(`
    INSERT INTO likes(user_id, secret_id)
    values($user_id, $secret_id)
    RETURNING id
`);

function insertLike(secret_id, user_id) {
    return insert_like.get({ secret_id, user_id });
}

const update_like_count = db.prepare(`
UPDATE secrets
SET likes = (
  SELECT count(likes.id)
  FROM likes
  WHERE likes.secret_id = secrets.id
);
`);

function updateLikeCount() {
    return update_like_count.run();
}

const remove_likes_by_user = db.prepare(
    `DELETE FROM likes WHERE likes.user_id = $user_id AND likes.secret_id = $secret_id`
);

function removeLikeByUser(secret_id, user_id) {
    return remove_likes_by_user.run({ secret_id, user_id });
}

const select_likes = db.prepare(
    `SELECT * FROM likes WHERE likes.user_id = $user_id AND likes.secret_id = $secret_id`
);

function checkUserLikes(secret_id, user_id) {
    const checkLike = select_likes.get({ secret_id, user_id }) ? true : false;
    return checkLike;
}

module.exports = {
    insertLike,
    updateLikeCount,
    removeLikeByUser,
    checkUserLikes,
};
