Backbone Errors
===============

Advanced Error Handling for Backbone using Radio.

Try, throw, and catch namespaced errors using Backbone.Radio with built-in
promise handling.

[![Travis Status](http://img.shields.io/travis/thejameskyle/backbone-errors/master.svg?style=flat&amp;label=travis)](https://travis-ci.org/thejameskyle/backbone-errors) [![Code Climate Score](http://img.shields.io/codeclimate/github/thejameskyle/backbone-errors.svg?style=flat)](https://codeclimate.com/github/thejameskyle/backbone-errors) [![Coverage](http://img.shields.io/codeclimate/coverage/github/thejameskyle/backbone-errors.svg?style=flat)](https://codeclimate.com/github/thejameskyle/backbone-errors) [![Dependency Status](http://img.shields.io/david/thejameskyle/backbone-errors.svg?style=flat)](https://david-dm.org/thejameskyle/backbone-errors)

## Usage

### Namespaced Errors

Backbone Errors introduces the concept of namespacing errors. Throwing an error
with a name will attempt to be caught by a handler with the same name, otherwise
it will use the "default" handler.

```js
Errors.catch('default', (name) => {
  console.log(`Nobody caught the ${name}.`);
});

Errors.throw('baseball');
// >> Nobody caught the baseball.

Errors.catch('baseball', err => {
  console.log(`I caught the baseball.`);
});

Errors.try('baseball', () => {
  throw new Error();
});
// >> I caught the baseball.
```

### Catching Errors

In order to setup a handler to catch an error use the `Errors.catch` method.

```js
Errors.catch('football', err => {
  console.log('Caught it!');
});
```

### Throwing Errors

There are two primary ways of throwing an error. The first is to call the
`Errors.throw` method.

```js
Errors.throw('football');
// >> Caught it!
```

The second is to use the `Errors.try` method which will execute a callback, and
if that callback throws it will forward the error to the proper handler.

```js
Errors.catch('hockey', err => {
  console.log(`Off go the ${err.message}`)
});

let isFighting = false;

function callback() {
  if (isFighting) {
    throw new Error('gloves');
  } else {
    return 'Start a fight!';
  }
}

Errors.try('hockey', callback);
// 'Start a fight!'

isFighting = true;

Errors.try('hockey', callback);
// >> Off go the gloves!
```

### Removing Error Handlers

If you would like to stop catching errors. You use the `stopCatching` method.

```js
Errors.catch('basketball', () => {
  console.log('Caught it.');
})

Errors.throw('basketball');
// >> Caught it.

Errors.stopCatching('basketball');

Errors.throw('basketball');
// >> Nobody caught the basketball.
```

## Contibuting

### Getting Started

[Fork](https://help.github.com/articles/fork-a-repo/) and
[clone](http://git-scm.com/docs/git-clone) this repo.

```
git clone git@github.com:thejameskyle/backbone-errors.git && cd backbone-errors
```

Make sure [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.org/) are
[installed](http://nodejs.org/download/).

```
npm install
```

### Running Tests

```
npm test
```

===

© 2014 James Kyle. Distributed under ISC license.
