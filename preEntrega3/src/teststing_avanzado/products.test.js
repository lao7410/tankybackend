const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../tu_proyecto_principal'); // Ruta al archivo principal de tu proyecto

describe('Router de products', () => {
  it('Debería devolver un código de estado 200 al obtener todos los productos', (done) => {
    request(app)
      .get('/products')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Debería devolver un código de estado 201 al crear un nuevo producto', (done) => {
    request(app)
      .post('/products')
      .send({ name: 'Producto de prueba', price: 10 })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('Debería devolver un código de estado 404 al intentar obtener un producto inexistente', (done) => {
    const idInexistente = 'producto_inexistente';

    request(app)
      .get(`/products/${idInexistente}`)
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
