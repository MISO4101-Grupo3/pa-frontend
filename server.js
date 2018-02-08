//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);