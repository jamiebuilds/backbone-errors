var root;

function setup() {
  root.expect = root.chai.expect;

  beforeEach(function() {
    this.sandbox = root.sinon.sandbox.create();
    root.stub = this.sandbox.stub.bind(this.sandbox);
    root.spy  = this.sandbox.spy.bind(this.sandbox);
  });

  afterEach(function() {
    delete root.stub;
    delete root.spy;
    this.sandbox.restore();
  });
}

if (typeof exports !== 'undefined') {
  root = global;
  root._ = require('lodash');
  root.Backbone = require('backbone');
  root.Backbone.Radio = require('backbone.radio');
  root.Errors = require('../src/errors').default;
  root.chai = require('chai');
  root.sinon = require('sinon');
  root.chai.use(require('sinon-chai'));
  setup();
} else {
  root = window;
  root.mocha.setup('bdd');
  root.onload = function() {
    root.mocha.checkLeaks();
    root.mocha.globals(['stub', 'spy', 'expect']);
    root.mocha.run();
    setup();
  };
}
