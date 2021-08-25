import Service from '../email.service';
import queue from '../../../common/queue';

jest.mock('../../../common/queue', () => ({
    add: jest.fn(),
}));

describe('Email Service Tests', () => {
    describe('addToQueue', () => {
        test('params added to queue', () => {
            const params = {
                to: ['to@example.com'],
                body: 'sample text body',
                subject: 'sample subject'
            }

            Service.addToQueue(params);

            expect(queue.add).toHaveBeenCalledWith(params)
        });
    });
});