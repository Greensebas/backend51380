import { logger } from '../src/middlewares/logger.js';
import supertest from 'supertest';
import chai from 'chai';

const expect = chai.expect;
const requester = supertest('http://localhost:8080')



describe('Testing CART ENDPOINTS', () => {
    before(async function () {
        logger.info('Init all tests')
    });

    let cartID;

    it('Get all carts TEST -> GET /api/carts', async () => {
        const response = await requester.get('/api/carts');
        expect(response.status).to.eql(200);
        expect(response.body.success).to.eql(true);
        expect(response.body.result).to.be.an('array');
    });
})