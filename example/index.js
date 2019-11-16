var ok = require('../')
var { h } = require('preact')
var EVENTS = require('@nichoth/events/namespace')({
    hello: ['world']
})
var struct = require('observ-struct')
var observ = require('observ')
var Router = require('ruta3')

var state = struct({
    foo: observ('world'),
    route: struct({})  // required
})

function subscribe({ state, view }) {
    view.on(EVENTS.hello.world, () => state.foo.set('bar'))
}

var router = Router()
router.addRoute('/', function foo (match) {
    return function (props) {
        return <div>foo</div>
    }
})

function view (props) {
    var { emit } = props
    if (props.route.pathname) var m = router.match(props.route.pathname)
    if (m) var RouteView = m.action(m) || null
    return <div>
        <RouteView  />
        <hr />
        hello {props.foo + ' '}
        <button onClick={emit(EVENTS.hello.world)}>emit event</button>
    </div>
}

var { view } = ok(state, view, document.getElementById('content'))
subscribe({ state, view })

if (process.env.NODE_ENV === 'development') {
    window.app = { state, view, EVENTS }
}
