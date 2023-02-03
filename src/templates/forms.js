function userCredentialsForm(path, errors = {}, values = {}) {
    const credentialshtml = /*html*/ `
      <div class="credentials-form">
        <form method="POST" class="Row" action="${path}">
          <div class="form-div">
            <label for="email">email</label>
            <input type="email" id="email" name="email" required

            value="${values.email ? sanitize(values.email) : ''}">
                 ${validation(errors.email)}>
          </div>
          <div class="form-div">
            <label for="password">password</label>
            <input type="password" id="password" name="password" required 

            value="${values.password ? sanitize(values.password) : ''}">

                 ${validation(errors.password)}
          </div>
          <button class="Button" type="submit">Submit</button>
        </form>
      </div>
    `;
    return credentialshtml;
}

function addSecretsForm(errors = {}, values = {}) {
    const formhtml = /*html*/ `
    <form method="POST" action="/add-secret">
    <p><label for="companies">Title</label> <br>   
    <input name="title" id="title">
    ${validation(errors.title)}</p>
    <p><label for="companies">Company</label> <br>
    <input class="companies" name="companies">
    ${validation(errors.companies)}
    </p>
    <p><label for="secret">Your secret:</label>

    <input name="secret" id="secret">    
    ${values.secret ? sanitize(values.secret) : ''}
    ${validation(errors.secret)}

    <button class="Button" type="Submit">Add &plus;</button>
    </form>
    `;
    return formhtml;
}

function sanitize(unsafe) {
    return unsafe.replace(/</g, '&lt;');
}

function validation(message) {
    if (message) {
        return `<span style="color: red">${message}</span>`;
    } else {
        return '';
    }
}
module.exports = { userCredentialsForm, addSecretsForm };
