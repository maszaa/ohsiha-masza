# OHSIHA App
Node.js application made as project work of OHSIHA 2016.

User can register, log in and log out, see other users' articles and write/modify/delete own ones (also private articles).

## Used technologies
Node.js with
* Express (/w body-parser, cookie-parser, express-session)
* Mongoose
* Jade
* Jade-bootstrap
* Passport (/w passport-local & passport-local-mongoose)
* Connect-flash

and MongoDB

## App structure
* `app.js` - web server
* `/config` - config files (e.g. database)
* `/helpers` - helping functions etc.
* `/models` - Mongoose models
* `/routes` - views and routes associated to those
* `/views` - Jade templates

## Installation
Assuming you have MongoDB and Node with npm installed, run

    npm install --global supervisor

to help you running your app (supervisor watches for file changes etc.).

After that install local npm packages in `app/` folder

    npm install

You can also change the database credentials in `app/config/database.js` if you want

## Running
Start MongoDB server and run the app by

    npm start
