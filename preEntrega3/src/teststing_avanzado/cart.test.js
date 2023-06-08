const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../tu_proyecto_principal'); // Ruta al archivo principal de tu proyecto

describe('Router de carts', () => {
  it('Debería devolver un código de estado 200 al obtener el carrito de un usuario', (done) => {
    const userId = '115'; // Reemplaza con un ID de usuario existente

    request(app)
      .get(`/carts/${userId}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Debería devolver un código de estado 404 al intentar obtener el carrito de un usuario inexistente', (done) => {
    const userIdInexistente = 'usuario_inexistente';

    request(app)
      .get(`/carts/${userIdInexistente}`)
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('Debería devolver un código de estado 201 al agregar un producto al carrito de un usuario', (done) => {
    const userId = '1515'; // Reemplaza con un ID de usuario existente
    const productId = '00005565'; // Reemplaza con un ID de producto existente

    request(app)
      .post(`/carts/${userId}`)
      .send({ productId: productId })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
});