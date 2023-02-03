# week3-auth-linnk

# Laura-Iman-Niete-Natalia-Konstantina-Authentication

A website named "Corporategirl" where you can read secrets about companies - inspired by gossipgirl, fishbowl and glassdoor. A user can create an account or sign-in to post and delete a secret they know about the company. For example, an employee at facebook could leak that Mark Zuckerberg didn't actually think of Facebook himself, he actually discussed the idea with the Wisconsin brothers (according to the social network).

**PLEASE NOTE: The add secret and delete functions do not currently work...We're working on it!**

## Setup

Make sure you have Git and Node (v18) installed.

1. Clone this repo and cd into the directory

2. Run `npm install` to install all the dependencies

3. Run `npm run seed` to create the database. Run `npm run seed-win` if using Windows.

4. Run `npm run dev` to start the server. Run `npm run dev-win` if using Windows.

This uses the nodemon library to auto-restart the server when you save changes.

## Testing

**We currently have no tests written**

## User stories

### Core

-   [x] As an invested user I want to create an account that I can sign in with, to add and read secrets about different companies.
-   [ ] As a cheeky user I want to post a secret about a company, and be able to delete it if I am the same logged in user.
-   [x] As a curious user I want to see other people's secrets.

Stretch goal:

-   [ ] As an impatient user, I want to be able to read about a specific company using a drop down box.

## UX/UI

This ![Logged in mockup](https://github.com/fac26/week3-auth-linnk/blob/main/public/Logged%20In%20version.odg) is how we envisioned Corporategirl would look when the user is logged in and can enjoy the full capabilities.
[Here](https://github.com/fac26/week3-auth-linnk/blob/main/public/Logged%20Out%20Version.odg) is how we evisioned it would look when the user has not yet signed up or logged in.

## Schema

<details>
  <summary>Schema Code</summary>

```js
BEGIN;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  hash TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS secrets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  content TEXT,
  user_id INTEGER REFERENCES users(id),
  company_id INTEGER REFERENCES companies(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companies(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

COMMIT;

```

</details>

---

## Acceptance Criteria

-   [ ] Forms for users to sign up and log in
-   [ ] A form for users to submit data only accessible to logged in users
-   [ ] A page showing all the data
-   [ ] A way for logged in users to delete their own data
-   [ ] Semantic form elements with correctly associated labels
-   [ ] A SQLite database
-   [ ] Hidden environment variables (i.e. not on GitHub)

## Stretch criteria

-   [ ] Tests for all routes
-   [ ] A user page that shows everything posted by a single user
-   [ ] GitHub Actions CI setup to run your tests when you push
