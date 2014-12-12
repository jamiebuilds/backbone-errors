(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'backbone.radio'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('lodash'), require('backbone.radio'));
  } else {
    factory(root.Backbone, root.Backbone.Radio);
  }
})(this, function(Backbone, Radio) {
  'use strict';

  // @include ./errors.js
  return Errors;
});
