const sinon = require("sinon");
const { expect } = require("chai");

const saleService = require("../../../services/saleService");
const saleController = require("../../../controllers/saleController");

describe('Chamada do controller getAll', () => {
  describe('Quando não existem vendas no banco', () => {
    const response = {}
    const request = {}

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getAll').resolves([]);
    })

    after(() => {
      saleService.getAll.restore();
    })

    it('é retornado o metodo "status" passando o codigo 200', async () => {
      await saleController.getAllSales(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('é retornado o metodo json contendo um array', async () => {
      await saleController.getAllSales(request, response)

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

  describe('quando existem vendas no banco de dados', () => {
    const response = {};
    const request = {};

    const MockResponse = [
      {
        "saleId": 1,
        "date": "2022-05-13T21:33:38.000Z",
        "productId": 1,
        "quantity": 5
      }
    ]

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(saleService, 'getAll').resolves(MockResponse);
    })

    after(() => {
      saleService.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await saleController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array esperado', async () => {
      await saleController.getAllSales(request, response);

      expect(response.json.calledWith(MockResponse)).to.be.equal(true);
    });
  });
})

describe("Ao chamar o controller saleRegister", () => {
  describe("quando é inserido com sucesso", () => {
    const response = {};
    const request = {};
    const mockedsale = {
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
    }

    before(() => {
      request.body = [
          {
            "productId": 1,
            "quantity": 3
          }
        ]

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, "saleRegister").resolves(mockedsale);
    });

    after(() => {
      saleService.saleRegister.restore();
    });

    it("é chamado o status com o código 201", async () => {
      await saleController.saleRegister(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com a venda inserida"', async () => {
      await saleController.saleRegister(request, response);
      expect(response.json.calledWith(mockedsale)).to.be.equal(true);
    });
  });
});