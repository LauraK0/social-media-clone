//cookies?
//display form to sign up, display link to home page if a user don't want to proceed with sign-in
//if an error don't redirect
const bcrypt = require('bcryptjs');

const { html } = require('../templates/html');
const { userCredentialsForm } = require('../templates/forms');
const { createUser } = require('../model/users');
const { createSession } = require('../model/sessions');

function getSignUp(req, res) {
    const title = 'Create an account';
    const h1 = /*html*/ `<h1>${title}</h1>`;
    const nav = /*html*/ `<ul>
    <li><a href='/'>Home</a><ul>`;
    const content = userCredentialsForm('/sign-up');
    const signUpPage = html(title, nav, h1.concat(content));
    res.send(signUpPage);
}

function postSignUp(req, res) {
    let { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send('Bad input');
    } else {
        bcrypt
            .hash(password, 12)
            .then((hash) => {
                email = sanitize(email);
                const user = createUser(email, hash);
                const session_id = createSession(user.id); //returns session id
                res.cookie('group2-sid', session_id, {
                    signed: true,
                    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
                    sameSite: 'lax',
                    httpOnly: true,
                });

                res.status(200).redirect('/');
            })
            .catch((err) =>
                console.log(
                    'Error from hashing the password, something went wrong with brypt.hash',
                    err
                )
            );
    }
}

function sanitize(input) {
    return input.replace(/</g, '&lt;');
}

module.exports = { getSignUp, postSignUp };

//add npm run seed function in package.json
//dependency bcryptjs
