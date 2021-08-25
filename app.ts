import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { EmailRoutes } from './src/email/email.routes';
import debug from 'debug';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<EmailRoutes> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());

// to allow cross-origin requests
app.use(cors());

// configuring logger to log all incoming requests
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // log requests as one-liners
}

// initializing the logger
app.use(expressWinston.logger(loggerOptions));

// configuring routes
routes.push(new EmailRoutes(app));

// root path message
const runningMessage = `Email Service is up and running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

server.listen(port, () => {
    routes.forEach((route: EmailRoutes) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    // logs the server has started
    console.log(runningMessage);
});