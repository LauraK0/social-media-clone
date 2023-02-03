const { checkCurrentUser } = require('../model/current-user');

function secretsTemplate(session, secretsFromDB) {
    const secretsUL = /*html*/ `
    <ul class="secrets-list">${secretsFromDB
        .map((secret) => secretTemplate(secret, session))
        .join('')}</ul>
    `;
    return secretsUL;
}

function secretTemplate(secret, session) {
    if (checkCurrentUser(secret, session) === false) {
        return /*html*/ `
        <li class="secret">
        <h4>${secret.title}</h4>
        <p>${secret.company_name}</p>
        <p>${secret.content}</p>
        ${likeButton(secret)}
    </li>
        `;
    } else {
        return /*html*/ `
        <li class="secret">
        <h4>${secret.title}</h4>
        <p>${secret.company_name}</p>
        <p>${secret.content}</p>
        ${deleteButton(secret)}
        ${likeButton(secret)}`;
    }
}

// function secrethtml() {
//     return /*html*/ `
//     <li class="secret">
//     <p>${secret.title}</p>
//     <p>${secret.company_name}</p>
//     <p>${secret.content}</p>
//     ${deleteButton(secret)}
//     ${likeButton(secret)}
// }

function deleteButton(secret) {
    return /*html*/ `
    <form method="POST" action="/delete-secret/${secret.id}">
    <button class="Button" type="submit">Delete</button>
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
