require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const SalesService = require('../../../services/SalesService');
const SalesController = require('../../../controllers/SalesController');

const rightSaleBody = [{
  "saleId": 1,
  "date": "2021-09-09T04:54:29.000Z",
  "productId": 1,
  "quantity": 2
}];

const payload = [{
    "date": "2022-07-05T22:41:40.000Z",
    "productId": 1,
    "quantity": 30
  },
  {
    "date": "2022-07-05T22:41:40.000Z",
    "productId": 2,
    "quantity": 10
  }
]

const response = {};
const request = {};

describe('Test Sales Controller', () => {
  describe('get all sales', () => {
    before(() => {
      sinon.stub(SalesService, 'getAllSales').resolves([rightSaleBody]);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => SalesService.getAllSales.restore());

    it('verifies return', async () => {
      SalesController.getAllSales(request, response);
      expect(response.status.calledWith(404)).to.be.false;
      expect(response.json.calledWith([rightSaleBody])).to.be.false;
    });
  });

  describe('GET a sale by ID', async () => {
    const request = {
      params: {
        id: 1,
      },
    };

    const response = [{
      "date": "2022-07-05T22:41:40.000Z",
      "productId": 1,
      "quantity": 30,
    },
    {
      "date": "2022-07-05T22:41:40.000Z",
      "productId": 2,
      "quantity": 10,
    }
    ];

    before(() => {
      sinon.stub(SalesService, 'getSalesById').resolves(payload);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => SalesService.getSalesById.restore());

    it('request is made correctly', async () => {
      await SalesController.getSalesById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
  });

  describe('Tests error msg', () => {
    const request = {
      params: {
        id: 1
      }
    };
    const response = {};

    before(() => {
      sinon.stub(SalesService, 'getSalesById').throws(new Error('Error'));
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    after(() => {
      SalesService.getSalesById.restore();
    });
    it('tests if it is false', async () => {
      await SalesController.getSalesById(request, response)
      expect(response.status.calledWith(404)).to.be.true;
    });
  });

  describe('deleting sale by id', () => {
    describe('considering a valid ID', () => {
      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SalesService, 'deleteSale').resolves(false);
      });

      after(() => {
        sinon.restore();
      });

      it('calls an error when trying to delete', async () => {
        await SalesController.deleteSale(request, response);
        expect(response.status.calledWith(404)).to.be.true;
      });
    });
  });
});
