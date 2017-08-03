jsdomglobal();
global.navigator = {
  userAgent: 'node.js'
};
import chai from 'chai';
import deepFreeze from 'deep-freeze';
import fetch from 'fetch-everywhere';
import jsdomglobal from 'jsdom-global';
import sinon from 'sinon';

const enzyme = require('enzyme');

global.shallow = enzyme.shallow;
global.render = enzyme.render;
global.expect = chai.expect;
global.mount = enzyme.mount;
global.deepFreeze = deepFreeze;
global.fetch = fetch;
global.sinon = sinon;
