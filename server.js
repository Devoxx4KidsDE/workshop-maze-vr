
require ('colors');
const os = require ('os');
const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const app = express ();

const config = {
    server: {
        port: 8080,
    },
    datetime: {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
        locale: 'de-DE',
        format: {
            hour  : 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        }
    }
};

function getTime () {
    return new Intl.DateTimeFormat(config.datetime.locale, config.datetime.format).format (new Date ());
}

app.use (function logRequestedResources (req, res, next) {
    if (req.method === 'GET') {
        console.log (`[${getTime ()}] Serving requested file ${path.basename(req.url) || 'index.html'}`.dim);
    }
    next ();
});
app.use (express.static (path.resolve (__dirname, 'app')));
app.use ('/node_modules', express.static (path.resolve (__dirname, 'node_modules')));
app.use (bodyParser.text ());

app.post ('/api/log', function logError (req) {
    const messageParts = req.body.split (os.EOL);

    const errorMessage = messageParts[0];
    const filenameTranspiled = messageParts[1].replace (/^.+((http.+\d\d:\d\d).+$)/, (a, b, url) => url).replace (/^.+\/(.+)$/, (a, file) => file);
    const line = filenameTranspiled.replace (/^.+:(\d\d):.+$/, (a, line) => line);
    const column = filenameTranspiled.replace (/^.+\d\d:(\d\d)$/, (a, col) => col);
    const filename = filenameTranspiled.replace(/^(.+js).+$/, (a, file) => file);

    const message = `[${getTime ()}] ${errorMessage.bold}, ${filename} line ${line}, column ${column}`;

    console.log (message.red);
});

app.listen (config.server.port, function () {
    console.log (`App is listening on http://localhost:${config.server.port}`);
});
