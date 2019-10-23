var EVENTS = require('@nichoth/events/namespace')({
    hello: ['world']
})
var ok = require('../src')
var struct = require('observ-struct')
var observ = require('observ')

var el = document.getElementById('content')
var state = struct({
    foo: observ('bar'),
    route: struct({})  // required
})

function subscribe({ state, view }) {
    view.on(EVENTS.hello.world, () => state.foo.set('baz'))
}

var { bus } = ok(state, subscribe, view, el)

if (process.env.NODE_ENV === 'development') {
    window.app = {
        state,
        view: bus,
        EVENTS
    }
}
