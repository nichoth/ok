var EVENTS = require('@nichoth/events/namespace')({
    hello: ['world']
})
var { h } = require('preact')
var ok = require('../')
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

function view (props) {
    var { emit } = props
    console.log(props)
    return <div>
        hello {props.foo + ' '}
        <button onClick={emit(EVENTS.hello.world)}>emit event</button>
    </div>
}

var { view } = ok(state, view, el)

subscribe({ state, view })

if (process.env.NODE_ENV === 'development') {
    window.app = { state, view, EVENTS }
}

