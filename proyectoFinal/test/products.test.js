import { logger } from '../src/middlewares/logger.js';
import supertest from 'supertest';
import chai from 'chai';


const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing PRODUCTS ENDPOINTS', () => {

    before(async function (done) {
        this.timeout(5000)
        logger.info('Init all products tests')
    });


    it('Get all products TEST | GET /api/products', async (req, res, done) => {

        req.session.user.email = 'jperez@gmail.com';
        const response = await requester.get('/api/products');
        console.log(response)
        expect(response.status).to.eql(200);
        // expect(response.body.status).to.eql('success');
        // expect(response.body.payload).to.be.an('array');
      });
})