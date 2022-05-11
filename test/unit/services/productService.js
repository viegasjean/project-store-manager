const sinon = require("sinon");
const { expect } = require("chai");

const productService = require("../../../services/productService")
const productModel = require("../../../models/productModel")

describe("Insere um novo produto", () => {
  // describe("quando o payload informado não é válido", async () => {
  //   const payloadProduct = {};

  //   it("retorna um boolean", async () => {
  //     const response = await productService.productRegister(payloadProduct);

  //     expect(response).to.be.a("boolean");
  //   });

  //   it('o boolean contém "false"', async () => {
  //     const response = await productService.productRegister(payloadProduct);

  //     expect(response).to.be.equal(false);
  //   });
  // });

  describe("quando é inserido com sucesso", async () => {
    const payloadProduct = {
      name: 'Product Name',
      quantity: 10,
    }

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(productModel, "productRegister").resolves({ id: ID_EXAMPLE });
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
      )
    });
  });
});