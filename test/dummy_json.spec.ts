import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('DummyJSON - Testes de Produtos', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://dummyjson.com';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('PRODUCTS', () => {

    // Cenário 1: Buscar um produto existente
    it('deve buscar um produto pelo ID com sucesso', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/1`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          id: 1
        });
    });

    // Cenário 2: Buscar um produto que não existe
    it('deve retornar erro ao buscar um produto inexistente', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/99999`)
        .expectStatus(StatusCodes.NOT_FOUND);
    });

    // Cenário 3: Criar um novo produto
    it('deve criar um novo produto com sucesso', async () => {
      await p
        .spec()
        .post(`${baseUrl}/products/add`)
        .withJson({
          title: 'Produto teste',
          price: 100,
          category: 'teste'
        })
        .expectStatus(StatusCodes.CREATED)
        .expectJsonLike({
          title: 'Produto teste',
          price: 100,
          category: 'teste'
        });
    });

    // Cenário 4: Listar produtos
    it('deve retornar a lista de produtos com sucesso', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          products: [
            {
              id: 1
            }
          ]
        });
    });

    // Cenário 5: Atualizar um produto
    it('deve atualizar um produto existente com sucesso', async () => {
      await p
        .spec()
        .put(`${baseUrl}/products/1`)
        .withJson({
          title: 'Produto atualizado'
        })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          id: 1,
          title: 'Produto atualizado'
        });
    });

  });
});