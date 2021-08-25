import { Request, Response } from 'express';
import Controller from '../email.controller';

jest.mock('../email.service', () => ({
    addToQueue: jest.fn(),
}));

describe('Email Controller Tests', () => {
    describe('sendEmail', () => {
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;

        beforeEach(() => {
            mockResponse = {
                json: jest.fn(),
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };
        });

        test('add params to queue, should send 200', () => {
            mockRequest = {
                body: {
                    to: ['to@example.com'],
                    body: 'sample text body',
                    subject: 'sample subject'
                }
            };

            Controller.sendEmail(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toBeCalledWith(200);
            expect(mockResponse.send).toBeCalledWith({
                sent: true
            });

        });
    });
});