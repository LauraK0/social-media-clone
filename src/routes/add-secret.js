//imports function from model/secrets.js
const { html, navBar } = require('../templates/html'); //all pages will have the navbar
const { createSecret } = require('../model/secrets');
const { getSession } = require('../model/sessions');
const { addSecretsForm } = require('../templates/forms');
const { addCompanyToDB } = require('../model/companies');

//for get req-diplay form for user to add new secret
function addSecretform(req, res) {
    if (!req.session) {
        return res.status(404).send(`page is only for signed users`);
    }
    const title = 'Add your secret!';
    const content = addSecretsForm(); //addSecretsForm.formhtml
    const nav = navBar(req.session);
    const body = html(title, nav, content); //sort this line out
    res.send(body);
}

//for post req
//we should check inputs for validation and sanitization

function handleAddSecret(req, res) {
    let { title, companies, secret } = req.body;

    const errors = {};
    if (!title) {
        errors.title = 'please add title';
    }
    if (!companies) {
        errors.companies = 'please add company';
    }
    if (!secret) {
        errors.secret = 'please add secret';
    }
    if (Object.keys(errors).length > 0) {
        console.log(errors);
        const title = 'Add your secret!';
        const content = addSecretsForm(errors); //addSecretsForm.formhtml
        const nav = navBar(req.session);
        const body = html(title, nav, content); //sort this line out
        res.send(body);
    } else {
        const companyId = addCompanyToDB(companies); //{id}
        const DBsession = getSession(req.session.id); //{ id: '5ON/HTpizT2wyYzDxt5elJHv', user_id: 7,expires_at: '2023-02-08'}
        //console.log(DBsession, 'add-secret.js, getSession() returns');

        createSecret(
            title,
            secret,
            DBsession.user_id,
            companyId.id
        );
        // console.log(secretCreated);
        res.redirect(`/`);
    }
}

module.exports = { addSecretform, handleAddSecret };

//const secrets = listSecrets(req.params.user_id);
