const sinon = require("sinon");

const { expect } = require("chai")

const connection = require("../../../models/connection")

const productModel = require("../../../models/productModel")

describe('Insere um produto no BD', () => {
  const payloadProduct = {
    name: 'Product Name',
    quantity: 10,
  }

  before(async () => {
    const execute = [{ insertId: 1 }]
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Quando é inserido com sucesso', async () => {
    it('retorna um objeto', async () => {
      const response = await productModel.productRegister(payloadProduct);
      expect(response).to.be.a('object')
    })

    it('tal objeto possui as propriedades do produto', async () => {
      const response = await productModel.productRegister(payloadProduct);

      expect(response).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    });
  })
})

describe('Busca todos os filme no BD', () => {
  describe('quando não existe nenhum filme criado', () => {

    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute)
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await productModel.getAll();
      expect(result).to.be.an('array');
    })

    it('o array está vazio', async () => {
      const result = await productModel.getAll();

      expect(result).to.be.empty;
    })
  });

  describe('quando existem filmes registrado no BD', () => {
    const resultExecute = [
      {
        id: 1,
        name: 'Martelo do Chapolin',
        quantity: 10,
      }
    ]

    before(() => {
      sinon.stub(connection, 'execute')
        .resolves([resultExecute])
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await productModel.getAll();
      expect(result).to.be.an('array');
    })

    it('o array não esta vazio', async () => {
      const result = await productModel.getAll();
      expect(result).to.be.not.empty;
    })

    it('o array possui objetos', async () => {
      const [result] = await productModel.getAll();
      expect(result).to.be.an('object');
    })

    it('o objeto que esta no array contem os atributos do produto ', async () => {
      const [result] = await productModel.getAll();
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    })
  })
})