# ok
A module that sticks togetheer some modules i like to use for front end apps.

## install
```
npm install ok
```

## example
```js
var ok = require('../')
var ns = require('@nichoth/events/namespace')
var struct = require('observ-struct')
var observ = require('observ')

var EVENTS = ns({
    hello: ['world']
})

var el = document.getElementById('content')
var state = struct({
    foo: observ('bar'),
    route: struct({})  // required
})

function subscribe({ state, view }) {
    view.on(EVENTS.hello.world, () => state.foo.set('bar'))
}

var { bus } = ok(el, state, subscribe)
```