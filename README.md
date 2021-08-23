**This project is WIP.**

### About

Agave is a personal journaling app. It's designed in a blog style but it's for private purposes only. I created this app to motivate myself to write more.

- it's a PWA and is meant to be mainly a mobile-oriented web app.
- it uses Firebase, which allowes cross-device synchronization and offline mode.
- it supports Markdown.

## How to install locally

- you need to create a [firebase project](https://firebase.google.com/).
- add the firebase config values to `.env` file under [these keys](https://github.com/Radek-Palisa/agave/blob/master/src/store.ts#L8-L15).
- change `projects.default` in `.firebaserc` to the ID of your newly created firebase project.
- run `npm install` and then `npm run start`.
- the app will be served on `http://localhost:3000`.

### Roadmap

- migrate to zero-data privacy model

