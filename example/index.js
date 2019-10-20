// var { h, render } = require('preact')
var ns = require('@nichoth/events/namespace')
var ok = require('../')
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

if (process.env.NODE_ENV === 'development') {
    window.app = {
        state,
        view: bus,
        EVENTS
    }
}
