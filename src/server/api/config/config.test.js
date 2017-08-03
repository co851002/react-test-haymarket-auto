import request from 'supertest';
import express from 'express';
import routes from './index.js';

describe('Config API enpoints', () => {
  var app;
  before(() => {
    app = express();
    app.use('/', routes);
  });

  describe('GET [api]/menu', () => {
    var responseValid, responseInvalid;

    beforeEach(() => {
      responseValid = request(app).get('/menus?menus=main-menu');
      responseInvalid = request(app).get('/menus?menus=xxx');
    });

    it('should return 200 response for valid menu', (done) => {
      responseValid
        .expect(200)
        .end(function(err) {
          if (err) return done(err);
          done();
        });
    });

    it('should return JSON object', (done) => {
      responseValid
        .expect('Content-Type', /json/)
        .end(function(err) {
          if (err) return done(err);
          done();
        });
    });

    it('should return 404 response for invalid menu', (done) => {
      responseInvalid
        .expect(404)
        .end(function(err) {
          if (err) return done(err);
          done();
        });
    });
  });
  
  describe('GET [api]/properties', () => {
    var responce;

    beforeEach(() => {
      responce = request(app).get('/properties?copyright.text&copyright.copytext');
    });

    it('should return 200 responce', (done) => {
      responce
        .expect(200)
        .end(function(err) {
          if (err) return done(err);
          done();
        });
    });

    it('should return JSON object', (done) => {
      responce
        .expect('Content-Type', /json/)
        .end(function(err) {
          if (err) return done(err);
          done();
        });
    });

    it('should have correct properties', (done) => {
      responce
        .then((responce) => {
          const body = JSON.parse(responce.body);
          expect(body).to.have.property('copyright.text');
          expect(body).to.have.property('copyright.copytext');
        })
        .catch(function() {
          done();
        });
    });
  });
});
