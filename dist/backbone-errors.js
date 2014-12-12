(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["backbone", "backbone.radio"], factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory(require("lodash"), require("backbone.radio"));
  } else {
    factory(root.Backbone, root.Backbone.Radio);
  }
})(this, function (Backbone, Radio) {
  "use strict";

  var channel = Backbone.Radio.channel("error");

  /**
   * [Errors description]
   * @public
   * @namespace Errors
   */
  var Errors = Backbone.Errors = {
    /**
     * Attempt to run a callback, catching any errors thrown and sending them to
     * their handlers by name. Callback can return a Promise which, if rejected,
     * will pass it's errors to the handlers as well.
     *
     * @public
     * @method try
     * @param {String} name - The name of the error handler.
     * @param {Function} callback - The callback to be executed.
     * @param {Object} [context] - The context to execute the `callback` with.
     * @return {*} - The value returned by `callback`.
     */
    "try": function (name, callback, context) {
      var ret;

      try {
        if (context) {
          ret = callback.call(context);
        } else {
          ret = callback();
        }
      } catch (e) {
        Errors["throw"](name, e);
      }

      if (ret instanceof Promise) {
        ret["catch"](function (e) {
          return Errors["throw"](name, e);
        });
      }

      return ret;
    },

    /**
     * Throw an error into its handler by `name`.
     *
     * @public
     * @method throw
     * @param {String} name - The name of the error handler.
     * @param {...*} args - Additional arguments to be passed to the handler.
     * @return {Object} - The `Errors` object, useful for chaining.
     */
    "throw": function () {
      channel.command.apply(channel, arguments);
      return this;
    },

    /**
     * Catch an error in a `callback` function by `name`. Passing `"default"` will
     * set the default handler for all errors.
     *
     * @public
     * @method catch
     * @param {String} name - The name of the error handler.
     * @param {Function} callback - The callback to be executed.
     * @param {Object} [context] - The context to execute the `callback` with.
     * @return {Object} - The `Errors` object, useful for chaining.
     */
    "catch": function (name, callback, context) {
      channel.comply(name, callback, context);
      return this;
    },

    /**
     * Catch an error only to be thrown a single time. After the first time the
     * error is caught, it will be removed.
     *
     * @public
     * @method catchOnce
     * @param {String} name - The name of the error handler.
     * @param {Function} callback - The callback to be executed.
     * @param {Object} [context] - The context to execute the `callback` with.
     * @return {Object} - The `Errors` object, useful for chaining.
     */
    catchOnce: function (name, callback, context) {
      channel.complyOnce(name, callback, context);
      return this;
    },

    /**
     * Remove one or many handlers. If `context` is passed, then all handlers with
     * that context will be removed. If `callback` is passed, then all handlers
     * with that callback will be removed. If `name` is passed then this method
     * will remove that handler. If no arguments are passed then all handlers are
     * removed from the object.
     *
     * You may also pass a hash of error handlers or space-separated list to
     * remove many error handlers at once.
     *
     * @public
     * @method stopCatching
     * @param {String} [name] - The name of the error handler.
     * @param {Function} [callback] - The callback to be executed.
     * @param {Object} [context] - The context to execute the `callback` with.
     * @return {Object} - The `Errors` object, useful for chaining.
     */
    stopCatching: function (name, callback, context) {
      channel.stopComplying(name, callback, context);
      return this;
    }

  };

  return Errors;
});
//# sourceMappingURL=backbone-errors.js.map