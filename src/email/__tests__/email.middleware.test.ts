import { NextFunction, Request, Response } from 'express';
import Middleware from '../email.middleware';

describe('Email Middleware Tests', () => {
    describe('verifyBody', () => {
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();

        beforeEach(() => {
            mockResponse = {
                json: jest.fn(),
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };
        });

        test('missing to, should send 400', () => {
            mockRequest = {
                body: {}
            };
            const expectedResponse = {
                'error': 'to should be an array of emails'
            };

            Middleware.verifyBody(mockRequest as Request, mockResponse as Response, nextFunction);

            expect(mockResponse.status).toBeCalledWith(400);
            expect(mockResponse.send).toBeCalledWith(expectedResponse);
        });

        test('if to is not an array, should send 400', () => {
            mockRequest = {
                body: {
                    to: 'to@example.com'
                }
            };
            const expectedResponse = {
                'error': 'to should be an array of emails'
            };

            Middleware.verifyBody(mockRequest as Request, mockResponse as Response, nextFunction);

            expect(mockResponse.status).toBeCalledWith(400);
            expect(mockResponse.send).toBeCalledWith(expectedResponse);
        });

        test('missing body, should send 400', () => {
            mockRequest = {
                body: {
                    to: ['to@example.com'],
                    subject: 'sample subject'
                }
            };
            const expectedResponse = {
                'error': 'body is missing'
            };

            Middleware.verifyBody(mockRequest as Request, mockResponse as Response, nextFunction);

            expect(mockResponse.status).toBeCalledWith(400);
            expect(mockResponse.send).toBeCalledWith(expectedResponse);
        });

        test('missing subject, should send 400', () => {
            mockRequest = {
                body: {
                    to: ['to@example.com'],
                    body: 'sample text body'
                }
            };
            const expectedResponse = {
                'error': 'subject is missing'
            };

            Middleware.verifyBody(mockRequest as Request, mockResponse as Response, nextFunction);

            expect(mockResponse.status).toBeCalledWith(400);
            expect(mockResponse.send).toBeCalledWith(expectedResponse);
        });

        test('correct body data, should call next', () => {
            mockRequest = {
                body: {
                    to: ['to@example.com'],
                    body: 'sample text body',
                    subject: 'sample subject'
                }
            }

            Middleware.verifyBody(mockRequest as Request, mockResponse as Response, nextFunction);

            expect(nextFunction).toBeCalled();
        });
    });
});