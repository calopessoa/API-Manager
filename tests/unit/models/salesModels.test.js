require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModel');

const rightSaleBody = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  }
];

const updateMock = [{
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  },
];

describe('Tests the SalesModel', async () => {
  const arrAllSales = [[]];
  before(async () => {
    await sinon.stub(connection, 'execute').resolves(arrAllSales)
  });

  after(async () => {
    await connection.execute.restore();
  });

  it('should return an empty array', async () => {
    const result = await SalesModel.getAllSales([]);
    expect(result).to.be.an('array');
  });
});

describe('get all sales', async () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([rightSaleBody]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('should return an array', async () => {
    const data = await SalesModel.getAllSales();
    expect(data).to.be.an('array');
  });
});

describe('Tests a sale by ID', () => {
  before(async () => {
    await sinon.stub(connection, 'execute').resolves([rightSaleBody])
  });

  after(async () => {
    await connection.execute.restore();
  });

  it('should return an array', async () => {
    const result = await SalesModel.getSalesById(1)
    expect(result).to.be.an('array')
  });
});

describe('tests if the user can add a new sale', () => {
  before(async () => {
    await sinon.stub(connection, 'execute').resolves([rightSaleBody]);
  });

  after(async () => {
    await connection.execute.restore();
  });

  it('should return an object', async () => {
    const result = await SalesModel.registerNewSale(rightSaleBody);
    expect(result).to.be.an('object');
  });
});

// describe('tests if the user can update a sale', () => {
//   const saleId = 1;
//   const arraySales = [{
//     "productId": 1,
//     "quantity": 30
//   }, ];
//   const updatedSale = {
//     "saleId": 1,
//     "itemsUpdate": [{
//       "productId": 1,
//       "quantity": 30
//     }
//     ]
//   }

//   before(async () => {
//     await sinon.stub(connection, 'execute').resolves(updateMock);
//   });

//   after(async () => {
//     await connection.execute.restore();
//   });

//   it('should return an array', async () => {
//      expect(await SalesModel.updateSale(saleId, updateMock)).to.be.equal(updatedSale);
//   });
// });

describe('if the user can DELETE a sale by id', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([rightSaleBody]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('deletes a sale', async () => {
    const action = await SalesModel.deleteSale(1);
    console.log(action);
    expect(connection.execute.calledOnce).to.be.false;
  });
});
