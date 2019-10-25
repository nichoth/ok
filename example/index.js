var EVENTS = require('@nichoth/events/namespace')({
    hello: ['world']
})
var { h } = require('preact')
var ok = require('../src')
var struct = require('observ-struct')
var observ = require('observ')

var el = document.getElementById('content')
var state = struct({
    foo: observ('bar'),
    route: struct({})  // required
})

function subscribe({ state, bus }) {
    bus.on(EVENTS.hello.world, () => state.foo.set('baz'))
}

function view (props) {
    var { emit } = props
    return <div>hello</div>
}

var { bus } = ok(state, view, el)

// @TODO need to pass in the bus
subscribe({ state, bus })

if (process.env.NODE_ENV === 'development') {
    window.app = { state, bus, EVENTS }
}
