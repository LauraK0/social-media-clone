//add new company to db, we get the name of company as argument

const db = require('../database/db');

const insert_company = db.prepare(`
    INSERT INTO companies(name)
    VALUES(
        $name
    )
    RETURNING id
    `);

function addCompanyToDB(name) {
    //console.log(name, 'from model/companies.js');
    return insert_company.get({ name });
}

module.exports = { addCompanyToDB };
