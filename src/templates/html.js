function html(title, nav, content) {
    return /*html*/ `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
    <header>
    <nav role="navigation" class="nav-bar">
      ${nav}
    </nav>
  </header>
        <main>
          ${content}
        </main>
      </div>
    </body>
  </html>
`;
}
function navBar(session) {
    return /*html*/ `<ul class="nav-bar">
    <li><a href='/'>Home</a>
        ${
            session
                ? /*html*/ `<li><a href="/add-secret">Add new secret</a><form method="POST" action="/log-out"><button class="Button">Log out</button></form></li>`
                : /*html*/ `<li><a href="/sign-up">Sign up</a></li><li><a href="/sign-in">log in</a></li>`
        }
    </ul>`;
}

module.exports = { html, navBar };
