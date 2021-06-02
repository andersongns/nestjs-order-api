import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Cliente } from 'src/clientes/entities/cliente.entity';

describe.skip('Clientes (e2e)', () => {
  let app: INestApplication;
  let cliente: Cliente;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/clientes (POST)', (done) => {
    const body = {
      nome: 'Anderson Santos',
      cpf: '09773683431',
      sexo: 'M',
      email: 'anderson.santos@tuta.io',
    };
    request(app.getHttpServer())
      .post('/clientes')
      .send(body)
      .expect(201)
      .then((response) => {
        cliente = response.body;
        expect(Object.keys(response.body)).toEqual([
          'nome',
          'cpf',
          'sexo',
          'email',
          'codigo',
        ]);
        done();
      });
  });

  it('/clientes (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/clientes')
      .expect(200)
      .then((response) => {
        expect(response.body.find(Boolean)).toEqual(cliente);
        done();
      });
  });

  it('/clientes/:id (GET)', (done) => {
    return request(app.getHttpServer())
      .get(`/clientes/${cliente.codigo}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(cliente);
        done();
      });
  });

  it('/clientes/:id (DELETE)', (done) => {
    return request(app.getHttpServer())
      .delete(`/clientes/${cliente.codigo}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(cliente);
        done();
      });
  });
});
