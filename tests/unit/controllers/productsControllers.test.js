require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const ProductsService = require('../../../services/ProductsService');
const ProductsController = require('../../../controllers/ProductsController');

const payloadProduct = [
  {
    "id": 1,
    "name": 'Martelo de Thor'
  }
];

const response = {};
const request = {};

describe('Test Product Controller', () => {
  describe('GET all', () => {
    before(() => {
      sinon.stub(ProductsService, 'getAllProducts').resolves([payloadProduct]);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    after(() => ProductsService.getAllProducts.restore());
    it('verifies return', async () => {
      await ProductsController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith([payloadProduct])).to.be.true;
    });
  });

  describe('tests failed response to get all products', () => {
    before(() => {
      sinon.stub(ProductsService, 'getAllProducts').throws(new Error('Error'));
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    after(() => ProductsService.getAllProducts.restore());
    it('verifies return', async () => {
      await ProductsController.getAllProducts(request, response);
      expect(response.status.calledWith(404)).to.be.true;
    });
  });

  describe('GET product by ID', async () => {
    const request = {
      params: {
        id: 1,
      },
    };

    const response = { id: 1, name: 'Martelo de Thor '}

    before(() => {
      sinon.stub(ProductsService, 'getProductById').resolves([payloadProduct]);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => ProductsService.getProductById.restore());

    it('request is made correctly', async () => {
      await ProductsController.getProductById(request, response);
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
      sinon.stub(ProductsService, 'getProductById').resolves(undefined);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    after(() => {
      ProductsService.getProductById.restore();
    });
    it('tests if it is false', async () => {
      await ProductsController.getProductById(request, response)
      expect(response.status.calledWith(404)).to.be.true;
    });
  });

  describe('deleting a product by id', () => {
    describe('considering a valid ID', () => {
      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'deleteProduct').resolves(false);
      });

      after(() => {
        sinon.restore();
      });
      it('calls an error when trying to delete', async () => {
        await ProductsController.deleteProduct(request, response);
        expect(response.status.calledWith(404)).to.be.true;
      });
    });
  });

  describe('when the search is valid', () => {

    before(() => {
      request.query = { q: 'Martelo de Thor' };

      sinon.stub(ProductsService, 'searchProduct').resolves(payloadProduct);
    });

    after(() => {
      ProductsService.searchProduct.restore();
    });

    it('respons with status "200"', async () => {
      await ProductsController.searchProduct(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
  });
});

describe('when the search occurs in error', () => {

  before(() => {
    request.query = {
      q: 'Machado de Thor'
    };

    sinon.stub(ProductsService, 'searchProduct').throws(new Error('Error'));
  });

  after(() => {
    ProductsService.searchProduct.restore();
  });

  it('responds with status "404"', async () => {
    await ProductsController.searchProduct(request, response);
    expect(response.status.calledWith(404)).to.be.true;
  });
});


