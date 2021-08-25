import { EmailType } from './email.types';
import queue from '../../common/queue';

class EmailService {
    async addToQueue(params: EmailType) {
        queue.add(params);
    }
}

export default new EmailService();