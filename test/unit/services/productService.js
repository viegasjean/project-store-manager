const sinon = require("sinon");
const { expect } = require("chai");

const productService = require("../../../services/productService")
const productModel = require("../../../models/productModel")

describe("Insere um novo produto", () => {
  describe("quando o produto existe", () => {
    const payloadProduct = {
      name: 'Martelo do Chapolin',
      quantity: 10,
    };

    before(() => {
      sinon.stub(productModel, "productRegister").resolves({ status: 409, message: 'Product already exists' });
    });

    after(() => {
      productModel.productRegister.restore();
    });

    it('é um objeto', async () => {
      const response = await productService.productRegister(payloadProduct);

      expect(response).to.be.a("object");
    });

    it('é um objeto com o status e message corretos', async () => {
      const response = await productService.productRegister(payloadProduct);

      expect(response).to.to.be.includes.all.keys(
        'status',
        'message'
      )

      expect(response).to.to.contains({ status: 409, message: 'Product already exists' })
    });
  });

  describe("quando é inserido com sucesso", () => {
    const payloadProduct = {
      name: 'Martelo do Chapolin',
      quantity: 10,
    }

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(productModel, "productRegister").resolves({
        id: ID_EXAMPLE,
        name: 'Martelo do Chapolin',
        quantity: 10,
      });
    });

    after(() => {
      productModel.productRegister.restore();
    });

    it("retorna um objeto", async () => {
      const response = await productService.productRegister(payloadProduct);

      expect(response).to.be.a("object");
    });

    it('tal objeto possui as propriedades do produto inserido', async () => {
      const response = await productService.productRegister(payloadProduct);

      expect(response).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    });
  });
});

describe('Lista todos os produtos', () => {
  describe('quando não existe nenhum produto', () => {

    before(() => {
      sinon.stub(productModel, 'getAll')
        .resolves([]);
    });

    after(() => {
      productModel.getAll.restore();
    });

    it('retorna um array e este array está vazio', async () => {
      const response = await productService.getAll();

      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  })

  describe('quando existem produtos', () => {

    before(() => {
      sinon.stub(productModel, 'getAll')
        .resolves([
          {
            id: 1,
            name: 'Martelo do Chapolin',
            quantity: 10
          }
        ]);
    });

    after(() => {
      productModel.getAll.restore();
    });


    it('retorna um array e este não está vazio', async () => {
      const response = await productService.getAll();

      expect(response).to.be.an('array');
      expect(response).to.be.not.empty;
    });


    it('o array possui itens do tipo objeto', async () => {
      const [item] = await productService.getAll();

      expect(item).to.be.an('object');
    });

    it('tais itens possui as propriedades esperadas', async () => {
      const [item] = await productService.getAll();

      expect(item).to.include.all.keys('id', 'name', 'quantity')
    });
  })
})

describe('Lista o produto por id', () => {
  describe('quanto o produto está no Banco', () => {
    before(() => {
      sinon.stub(productModel, 'productById').resolves(
          {
            "id": 1,
            "name": "produto A",
            "quantity": 10
          }
        );
    });

    after(() => {
      productModel.productById.restore();
    });

    it("retorna um objeto", async () => {
      const response = await productService.productById(1);

      expect(response).to.be.a("object");
    });

    it('tal objeto possui as propriedades do produto inserido', async () => {
      const response = await productService.productById(1);

      expect(response).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    });

  })
  describe('quando o produto não está no banco', () => {
    before(() => {
      sinon.stub(productModel, 'productById')
        .resolves(undefined);
    });

    after(() => {
      productModel.productById.restore();
    });

    it('retorna um error com a mensagem "Product not found"', async () => {
      try {
        await productService.productById(10);
      } catch (error) {
        expect(error.message).to.equal('Product not found');
      }
    });
  })
})