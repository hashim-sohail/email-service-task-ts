import express from 'express';
import EmailService from './email.service';

class EmailController {
    async sendEmail(req: express.Request, res: express.Response) {
        const { body } = req;

        EmailService.addToQueue(body);

        res.status(200).send({
            sent: true
        });
    }
}

export default new EmailController();