import express from 'express';

class EmailMiddleware {
    async verifyBody(req: express.Request, res: express.Response, next: express.NextFunction) {
        const { to, body, subject } = req.body;

        if (!to || !Array.isArray(to)) {
            return res.status(400).send({
                error: `to should be an array of emails`,
            });
        }

        if (!subject) {
            return res.status(400).send({
                error: `subject is missing`,
            });
        }

        if (!body) {
            return res.status(400).send({
                error: `body is missing`,
            });
        }

        next();
    }
}

export default new EmailMiddleware();