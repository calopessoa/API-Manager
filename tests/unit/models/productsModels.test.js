require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/ProductsModel');

const mockedProduct = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  }
];

describe('M when there is no product registred', () => {
  before(async () => {
    const arrAllProducts = [[]];

    sinon.stub(connection, 'execute').resolves(arrAllProducts);
  });

  after(async () => { connection.execute.restore() });

  it('returns an array', async () => {
    const result = await ProductsModel.getAllProducts([]);
    expect(result).to.be.an('array');
  });

  it('if the array is empty', async () => {
    const result = await ProductsModel.getAllProducts();
    expect(result).to.be.empty;
  });
});

describe('when there is a product registered', async () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves(mockedProduct);
  })

  after(() => {
    connection.execute.restore();
  });

  it('Se o retorno é "Martelo de Thor"', async () => {
    const result = await ProductsModel.getAllProducts();
    expect(result).to.be.equal(mockedProduct[0])
  });
  // to create a product
  it('if it s successful to create a product', async () => {
    const result = await ProductsModel.registerNewProduct(mockedProduct[0]);
    expect(result).to.have.property('id');
    expect(result).to.have.property('name');
  });
});

describe('when there is a product registered(id)', () => {
  describe('search a product by id', () => {
    const id = 1;
    before(() => {
      sinon.stub(connection, 'execute').resolves(mockedProduct);
    });

    after(() => {
      connection.execute.restore();
    });

    it('returns an object', async () => {
      const result = await ProductsModel.getProductById(mockedProduct[0].id);
      expect(result).to.be.an('object')
    });

    it('returns an object with the following attributes: name and id', async () => {
      const result = await ProductsModel.getProductById(mockedProduct);
      console.log(result);
      expect(result).to.have.a.property('id');
      expect(result).to.have.a.property('name');
    });
  });
});

describe('Tests if the SEARCH engine works', () => {
  describe('when no product is retrieved', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('returns an empty array', async () => {
      const product = await ProductsModel.searchProduct('non-existing product');
      expect(product).to.be.empty;
    });
  });

  describe('when the search is valid', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mockedProduct]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('returns an expected array', async () => {
      const product = await ProductsModel.searchProduct(mockedProduct[0].name);
      expect(product).to.be.equal(mockedProduct);
    });
  });
});