const { checkCurrentUser } = require('../routes/current-user');
const { checkUserLikes } = require('../model/likes');

function secretsTemplate(session, secretsFromDB) {
    const secretsUL = /*html*/ `
    <ul class="secrets-list">${secretsFromDB
        .map((secret) => secretTemplate(secret, session))
        .join('')}</ul>
    `;
    return secretsUL;
}

function secretTemplate(secret, session = {}) {
    const userId = session.user_id || null;
    const checkLike = checkUserLikes(secret.id, userId)
    const secretTemplate = /*html*/ `
        <li class="secret">
        <h4>${secret.title}</h4>
        <p>${secret.company_name}</p>
        <p>${secret.content}</p>
        <p>${secret.likes}</p>
        ${
            checkLike === false
                ? /*html*/ `${likeButton(secret)}`
                : /*html*/ `${unlikeButton(secret)}`
        }      
    `;
    if (checkCurrentUser(secret, session) === false) {
        return /*html*/ `
        ${secretTemplate}
    </li>
        `;
    }
    return /*html*/ `
        ${secretTemplate}
        ${deleteButton(secret)}`;
}

function deleteButton(secret) {
    return /*html*/ `
    <form method="POST" action="/delete-secret/${secret.id}">
    <button class="Button" type="submit">Delete</button>
    </form>
    `;
}

function unlikeButton(secret) {
    return /*html*/ `
    <form method="POST" action="/unlike-secret/${secret.id}">
    <button class="Button" type="submit">Unlike</button>
    </form>
    `;
}

function likeButton(secret) {
    return /*html*/ `
    <form method="POST" action="/like-secret/${secret.id}">
    <button class="Button" type="submit">Like</button>
    </form>
    `;
}
module.exports = { secretsTemplate };
