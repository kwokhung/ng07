npm install -g @angular/cli

ng new ng07

ng serve --open

npm install --save-dev electron
npm install --save-dev electron-builder
#npm install --save-dev --save-exact electron@latest
#npm install --save-dev --save-exact electron-builder@latest

npm run build-electron
npm run package-electron
npm run build-electron-aot
npm run package-electron-aot
npm run electron

#npx electron .
#npx electron-builder build --windows --config electron/builder.yaml

1. Init Repo (VSCode)

2. Commit Repo (VSCode)

3. Create Repo (GitHub REST API)
-> curl -u 'kwokhung' https://api.github.com/user/repos -d '{"name":"ng07"}'

4. Remote Add Origin
-> git remote add origin https://github.com/kwokhung/ng07

5. Push Origin Master
-> git push -u origin master

npm install --save jquery
npm install --save popper.js
npm install --save bootstrap
npm install --save font-awesome
#npm install --save angular-font-awesome
#npm install --save @fortawesome/fontawesome-svg-core
#npm install --save @fortawesome/free-solid-svg-icons
#npm install --save @fortawesome/angular-fontawesome
ng generate module app-routing --flat --module=app
ng generate component components/home
ng generate component components/expense
ng generate component components/expense-item
ng generate component components/loader
ng generate service services/expense
ng generate service services/loader
ng generate class models/expense
ng generate class models/mock-data
