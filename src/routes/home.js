// if a user signed-in display his secrets with delete-btn, here we should also call function from model/sessions.js which returns user-id
//we expect to get a list of user secrets ids from model/secrets
//map through select-all-secrets and if id === user secrets ids we should add detele-btn

//post req

const { html, navBar } = require('../templates/html');
const { secretsTemplate } = require('../templates/secrets-templates');
const secretsFromDB = require('../model/secrets');

function getHomePage(req, res) {
    const title = 'Corporategirl secrets';
    const secretsArr = secretsFromDB.listSecrets();
    const nav = navBar(req.session); //we pass on session data
    //console.log(secretsArr);

    const content = secretsTemplate(req.session, secretsArr);
    const homePage = html(title, nav, content);
    res.send(homePage);
}

module.exports = { getHomePage };
