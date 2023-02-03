const { deleteSecret } = require('../model/secrets');

function handleDeleteSecret(req, res) {
    const id = req.params.id;
    deleteSecret(id);
    res.redirect('/');
}

module.exports = { handleDeleteSecret };

