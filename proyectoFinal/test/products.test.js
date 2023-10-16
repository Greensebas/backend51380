import { logger } from '../src/middlewares/logger.js';
import supertest from 'supertest';
import chai from 'chai';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing CART ENDPOINTS', () => {

    before(async function () {
      logger.info('Init all products tests')
    });
})