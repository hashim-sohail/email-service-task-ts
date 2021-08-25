import express from 'express';
import EmailController from './email.controller';
import EmailMiddleware from './email.middleware';

export class EmailRoutes {
    app: express.Application;
    name: string;

    constructor(app: express.Application) {
        this.app = app;
        this.name = 'Email Routes';
        this.configureRoutes();
    }

    getName(): string {
        return this.name;
    }

    configureRoutes(): express.Application {

        this.app.route(`/email`)
            .post(
                EmailMiddleware.verifyBody,
                EmailController.sendEmail
            );

        return this.app;
    }
}