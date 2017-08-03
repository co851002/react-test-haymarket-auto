import request from 'supertest';
import express from 'express';
import routes from './index.js';

describe('Config API enpoints', () => {
  var app;
  before(() => {
    app = express();
    app.use('/', routes);
  });

  describe('GET [api]/articles?contentType=article&nodes=/advice/title-article-1', () => {
    var responce;

    beforeEach(() => {
      responce = request(app).get('/articles?contentType=article&nodes=/advice/title-article-1');
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
    
  });

  describe('GET [api]/articles?contentType=teasers&nodes=/advice', () => {
    var responce;

    beforeEach(() => {
      responce = request(app).get('/articles?contentType=teasers&nodes=/advice');
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

  });

  describe('GET [api]/articles?contentType=teaserswhateverThatIsNotPartOfTheList...', () => {
    var responce;

    beforeEach(() => {
      responce = request(app).get('/articles?contentType=whateverThatIsNotPartOfTheList&nodes=/advice');
    });

    it('should return 404 responce', (done) => {
      responce
        .expect(404)
        .end(function(err) {
          if (err) return done(err);
          done();
        });
    });

  });
  
});
