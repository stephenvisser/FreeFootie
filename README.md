Join the conversation [here](https://groups.google.com/forum/#!forum/coding-with-a-conscience)

Prequisites:
* [nodejs](http://nodejs.org/)
* grunt-cli (npm package)
* bower (npm package)

Starting work on this project is easy. You just need to install the prereqs for your chosen OS. After that, just follow the steps below:

    git clone https://github.com/ConCode/FreeFootie
    cd FreeFootie
    npm install
    bower install
    grunt server

###Structure
This nodejs application has its components split between client and server. Files found in the client directory
have to do with what is actually loaded and rendered by the browser. This means html, javascript (angular components), etc.
The server directory contains all the backend systems such as the REST api handling, database interactions, etc.

The http server is started and configured in app.js. Setting things like port numbers can be done in settings.json.

###Pages

#### Admin: 

- /admin (Dashboard, management portal)
- /admin/game/:id (Game details)
- /scheduler (Create games for league play)
- /admin/team (Administer the teams)

#### Ref:

- /ref (Dashboard)
