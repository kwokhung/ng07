npm install -g @angular/cli

ng new ng07

ng serve --open
ng serve --open --prod

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
npm install --save moment
npm install --save @angular/material@^6.1.0
npm install --save @angular/cdk@^6.1.0
npm install --save @angular/animations@^6.1.0
npm install --save @angular/material-moment-adapter@^6.1.0
#npm install --save angular-font-awesome
#npm install --save @fortawesome/fontawesome-svg-core
#npm install --save @fortawesome/free-solid-svg-icons
#npm install --save @fortawesome/angular-fontawesome
ng generate module app-routing --flat --module=app
ng generate component components/home
ng generate component components/expense
ng generate component components/expense-item
ng generate component components/loader
ng generate component components/export-list
ng generate component components/export-item
ng generate component components/duplicateInvoice
ng generate component components/duplicateInvoice-item
ng generate component components/expenseToBeExported
ng generate service services/expense
ng generate service services/loader
ng generate class models/expense
ng generate class models/exportItem
ng generate class models/duplicateInvoice
ng generate class models/mock-data
ng generate interface models/searchCriteria
ng generate interface models/searchExpenseCriteria
ng generate interface models/searchExportCriteria
ng generate interface models/downloadExportCriteria
ng generate pipe pipes/formatDate