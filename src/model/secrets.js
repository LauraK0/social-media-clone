const db = require('../database/db');

//add secret to db-user enters on the 'POST secret' page their secret and the company the secret is about
//the secrets table also accepts the user_id
//as it must know who entered it so then later on the same user can delete their posts/secrets
const add_secret = db.prepare(`
    INSERT INTO secrets(title, content, user_id, company_id)
    VALUES ($title, $content, $user_id, $company_id)
    RETURNING id, content, created_at
`);

function createSecret(title, content, user_id, company_id) {
    console.log(title, content, user_id, company_id, 'from secrets.js');
    return add_secret.get({ title, content, user_id, company_id }); //should give company id
}

//delete secret from db
const delete_secret = db.prepare(`
    DELETE FROM secrets
    WHERE id = ?
`);

//must know the secrets ID to delete the entire row containing the secret (content)
//e.g. if the delete button clicked on is on a secret that has an id of 2, then it will delete that row
function deleteSecret(secretid) {
    // return delete_secret.run(secretid);
    const result = delete_secret.run(secretid);
    if (result.changes === 1) {
        console.log(`Successfully deleted secret with id ${secretid}`);
    } else {
        console.error(`Failed to delete secret with id ${secretid}`);
    }
    //return result;
}

//console.log(deleteSecret(2))

//get all secrets
const select_all_secrets = db.prepare(`
    SELECT 
    secrets.id,
    secrets.title,
    secrets.content,
    secrets.user_id,
    companies.name AS company_name
    FROM secrets
    JOIN companies WHERE secrets.company_id = companies.id
`);

function listSecrets() {
    return select_all_secrets.all();
}
//.all() returns all the rows of the db

//console.log(listSecrets())

//select all secrets from 'secrets' table by user_id and return secret id!
const select_specific_secret = db.prepare(`
  SELECT id, title, content
  FROM secrets 
  WHERE user_id = ?
`);

function listSecretsWithUserID(user_id) {
    return select_specific_secret.get(user_id);
}

//console.log(listSecretsWithUserID(1))
//iman

module.exports = {
    createSecret,
    deleteSecret,
    listSecrets,
    listSecretsWithUserID,
};
