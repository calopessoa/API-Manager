require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const SalesModel = require('../../../models/SalesModel');
const SalesService = require('../../../services/SalesService');

const rightSaleBody = [{
  "saleId": 1,
  "date": "2021-09-09T04:54:29.000Z",
  "productId": 1,
  "quantity": 2
}];

describe('testing Sales Services', () => {

  describe('when there is a sale registered', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'getAllSales').resolves([rightSaleBody]);
    });

    afterEach(() => {
      SalesModel.getAllSales.restore();
    });
    it('returns an array', async () => {
      const result = await SalesService.getAllSales();
      expect(result).to.be.an('array');
    })
    it('does not return an empty array', async () => {
      const result = await SalesService.getAllSales();
      expect(result).to.be.not.empty;
    });
    it('returns an array with object', async () => {
      const [result] = await SalesService.getAllSales();
      expect(result).to.be.an('array');
    });
    it('it has the following attributes: saleId, date, productId, quantity', async () => {
      const [result] = await SalesService.getAllSales();
      expect(result).to.be.a('array');
      expect(result[0]).to.have.property('saleId');
      expect(result[0]).to.have.property('date');
      expect(result[0]).to.have.property('productId');
      expect(result[0]).to.have.property('quantity');
    });
  });

  describe("test service getSalesById", () => {
    before(() => {
      sinon.stub(SalesModel, "getSalesById").resolves(rightSaleBody[0]);
    });

    after(() => {
      SalesModel.getSalesById.restore();
    });

    it("should return a correct product", async () => {
      const product = await SalesService.getSalesById(1);
      expect(product).to.be.equal(rightSaleBody[0]);
    });

    it("should throw an error", async () => {
      SalesModel.getSalesById.restore();
      sinon.stub(SalesModel, "getSalesById").resolves([]);
      try {
        await SalesService.getSalesById(99);
      } catch (error) {
        expect(error.message).to.be.equal("Sale not found");
      }
    });
  });

  describe('if the user can delete a sale by id', () => {
    before(() => {
      sinon.stub(SalesModel, 'deleteSale').resolves([rightSaleBody]);
    });

    after(() => {
      SalesModel.deleteSale.restore();
    });

    it('deletes a sale', async () => {
      const action = await SalesService.deleteSale(1);
      console.log(action);
      expect(SalesModel.deleteSale.calledOnce).to.be.true;
    });
  });
});