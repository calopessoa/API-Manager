require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const ProductsModel = require('../../../models/ProductsModel');
const ProductsService = require('../../../services/ProductsService');

const mockedProduct = [
  {
    id: 1,
    name: 'Martelo de Thor'
  }
];

const allProductsResponse = [{
    id: 1,
    name: 'Martelo de Thor'
  },
  {
    id: 2,
    name: 'Traje de encolhimento'
  },
  {
    id: 3,
    name: 'Escudo do Capitão América'
  },
];

describe('testing getAllProducts from services', () => {
  describe('when there is no product registred', () => {
    const arrAllProducts = [[]];

    beforeEach(() => {
      sinon.stub(ProductsModel, 'getAllProducts')
        .resolves(arrAllProducts);
    });

    afterEach(() => {
      ProductsModel.getAllProducts.restore();
    });
    it('returns an array', async () => {
      const result = await ProductsService.getAllProducts();
      expect(result).to.be.an('array');
    });
    it('if the array is empty', async () => {
      const [result] = await ProductsService.getAllProducts();
      expect(result).to.be.empty;
    });
  });

  describe('when there is a product registered', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getAllProducts')
        .resolves([mockedProduct]);
    });

    afterEach(() => {
      ProductsModel.getAllProducts.restore();
    });
    it('returns an array', async () => {
      const result = await ProductsService.getAllProducts();
      expect(result).to.be.an('array');
    })
    it('does not return an empty array', async () => {
      const result = await ProductsService.getAllProducts();
      expect(result).to.be.not.empty;
    });
    it('returns an array with object', async () => {
      const [result] = await ProductsService.getAllProducts();
      expect(result).to.be.an('array');
    });
    it('it has the following attributes: id and name', async () => {
      const [result] = await ProductsService.getAllProducts();
      expect(result).to.be.a('array');
      expect(result[0]).to.have.property('id');
      expect(result[0]).to.have.property('name');
    });
  });

  describe("test service getProductById", () => {
    before(() => {
      sinon.stub(ProductsModel, "getProductById").resolves(allProductsResponse[0]);
    });

    after(() => {
      ProductsModel.getProductById.restore();
    });

    it("should return a correct product", async () => {
      const product = await ProductsService.getProductById(1);
      expect(product).to.be.equal(allProductsResponse[0]);
    });

    it("should throw an error", async () => {
      ProductsModel.getProductById.restore();
      sinon.stub(ProductsModel, "getProductById").resolves([]);
      try {
        await ProductsService.getProductById(99);
      } catch (error) {
        expect(error.message).to.be.equal("Product not found");
      }
    });
  });
});

describe('Tests if the SEARCH engine works', async () => {
  describe('when no product is retrieved', () => {

    before(() => {
      sinon.stub(ProductsModel, 'searchProduct').resolves([]);
    });

    after(() => {
      ProductsModel.searchProduct.restore();
    });

    it('returns an empty array, no products found', async () => {
        try {
          await ProductsService.searchProduct('Claws');
        } catch (error) {
          expect(error.message).to.be.equal("Product not found");
        }
    });
  });

  describe('when the search is valid', () => {

    before(() => {
      sinon.stub(ProductsModel, "searchProduct").resolves(mockedProduct)
    });

    after(() => {
      ProductsModel.searchProduct.restore();
    });

    it('returns an expected array', async () => {
      const product = await ProductsService.searchProduct(mockedProduct[0].name);
      expect(product).to.be.equal(mockedProduct);
    });
  });
});