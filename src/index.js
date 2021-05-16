const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// Settings
app.set('port', process.env.PORT || 3000);

// Midactordlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
app.use(require('./routes/'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});