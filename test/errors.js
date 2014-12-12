describe('Errors', function() {
  beforeEach(function() {
    this.channel = Backbone.Radio.channel('error');
    stub(this.channel);
  });

  describe('#try', function() {
    beforeEach(function() {
      spy(Backbone.Errors, 'try');
      spy(Backbone.Errors, 'throw');
    });

    describe('when passing a context', function() {
      beforeEach(function() {
        this.callback = stub();
        this.context = {};
        Backbone.Errors.try('name', this.callback, this.context);
      });

      it('should execute the callback with the context', function() {
        expect(this.callback)
          .to.have.been.calledOn(this.context);
      });
    });

    describe('when callback does not throw an error', function() {
      beforeEach(function() {
        Backbone.Errors.try('name', function() {
          return 'value';
        });
      });

      it('should return the value', function() {
        expect(Backbone.Errors.try)
          .to.have.returned('value');
      });
    });

    describe('when callback throws an error', function() {
      beforeEach(function() {
        Backbone.Errors.try('name', function() {
          throw 'reason';
        });
      });

      it('should handle the error internally', function() {
        expect(function() {
          Backbone.Errors.try('name', function() {
            throw 'reason';
          });
        }).not.to.throw();
      });

      it('should send the error to the handler', function() {
        expect(Backbone.Errors.throw)
          .to.have.been.calledWith('name', 'reason');
      });
    });

    describe('when callback returns a promise that gets resolved', function() {
      beforeEach(function() {
        this.promise = Promise.resolve();

        return Backbone.Errors.try('name', function() {
          return this.promise;
        }, this);
      });

      it('should return the promise', function() {
        expect(Backbone.Errors.try)
          .to.have.returned(this.promise);
      });

      it('should send out an error', function() {
        expect(Backbone.Errors.throw)
          .not.to.have.been.called;
      });
    });

    describe('when callback returns a promise that gets rejected', function() {
      beforeEach(function() {
        this.promise = Promise.reject('reason');

        return Backbone.Errors.try('name', function() {
          return this.promise;
        }, this).catch(function() {});
      });

      it('should return the promise', function() {
        expect(Backbone.Errors.try)
          .to.have.returned(this.promise);
      });

      it('should send the rejection reason to its error handler', function() {
        expect(Backbone.Errors.throw)
          .to.have.been.calledWith('name', 'reason');
      });
    });
  });

  describe('#throw', function() {
    beforeEach(function() {
      spy(Backbone.Errors, 'throw');
      Backbone.Errors.throw('arg1', 'arg2', 'arg3', 'arg4');
    });

    it('should pass the arguments to Backbone.Radio.command', function() {
      expect(this.channel.command)
        .to.have.been.calledWithExactly('arg1', 'arg2', 'arg3', 'arg4');
    });

    it('should return this', function() {
      expect(Backbone.Errors.throw)
        .to.have.returned(Backbone.Errors);
    });
  });

  describe('#catch', function() {
    beforeEach(function() {
      spy(Backbone.Errors, 'catch');
      Backbone.Errors.catch('arg1', 'arg2', 'arg3', 'arg4');
    });

    it('should pass the arguments to Backbone.Radio.comply', function() {
      expect(this.channel.comply)
        .to.have.been.calledWithExactly('arg1', 'arg2', 'arg3');
    });

    it('should return this', function() {
      expect(Backbone.Errors.catch)
        .to.have.returned(Backbone.Errors);
    });
  });

  describe('#catchOnce', function() {
    beforeEach(function() {
      spy(Backbone.Errors, 'catchOnce');
      Backbone.Errors.catchOnce('arg1', 'arg2', 'arg3', 'arg4');
    });

    it('should pass the arguments to Backbone.Radio.complyOnce', function() {
      expect(this.channel.complyOnce)
        .to.have.been.calledWithExactly('arg1', 'arg2', 'arg3');
    });

    it('should return this', function() {
      expect(Backbone.Errors.catchOnce)
        .to.have.returned(Backbone.Errors);
    });
  });

  describe('#stopCatching', function() {
    beforeEach(function() {
      spy(Backbone.Errors, 'stopCatching');
      Backbone.Errors.stopCatching('arg1', 'arg2', 'arg3', 'arg4');
    });

    it('should pass the arguments to Backbone.Radio.stopComplying', function() {
      expect(this.channel.stopComplying)
        .to.have.been.calledWithExactly('arg1', 'arg2', 'arg3');
    });

    it('should return this', function() {
      expect(Backbone.Errors.stopCatching)
        .to.have.returned(Backbone.Errors);
    });
  });
});
