const sinon = require("sinon");
const { expect } = require("chai");

const productService = require("../../../services/productService");
const productController = require("../../../controllers/productController");

describe('Chamada do controller getAllProducts', () => {
  describe('Quando não existem filmes no banco', () => {
    const response = {}
    const request = {}

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'getAll').resolves([]);
    })

    after(() => {
      productService.getAll.restore();
    })

    it('é retornado o metodo "status" passando o codigo 200', async () => {
      await productController.getAllProducts(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('é retornado o metodo json contendo um array', async () => {
      await productController.getAllProducts(request, response)

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

  describe('quando existem filmes no banco de dados', async () => {
    const response = {};
    const request = {};

    const MockResponse = [
      {
        id: 1,
        name: 'Martelo do Chapolin',
        quantity: 10,
      }
    ]

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productService, 'getAll')
        .resolves(MockResponse);
    })

    after(() => {
      productService.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productController.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productController.getAllProducts(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
})

describe("Ao chamar o controller productRegister", () => {
  describe("quando é inserido com sucesso", async () => {
    const response = {};
    const request = {};
    const mockedProduct = {
      id: 1,
      name: "Paçoca",
      quantity: 11
    }

    before(() => {
      request.body = {
        name: "Paçoca",
        quantity: 11
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "productRegister").resolves(mockedProduct);
    });

    after(() => {
      productService.productRegister.restore();
    });

    it("é chamado o status com o código 201", async () => {
      await productController.productRegister(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com o produto inserido"', async () => {
      await productController.productRegister(request, response);
      expect(response.json.calledWith(mockedProduct)).to.be.equal(true);
    });
  });
});