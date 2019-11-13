var ok = require('../')
var test = require('tape')
var struct = require('observ-struct')
var observ = require('observ')
var { h } = require('preact')

function View (props) {
    return <div>view</div>
}

var state = struct({
    hello: observ(null),
    route: observ(null)
})

var el = document.body

var _view
test('start', function (t) {
    var { view } = ok(state, View, el)
    _view = view
    t.ok(view, 'returns')
    t.end()
})

test('event', function (t) {
    t.plan(1)
    _view.on('foo', function (data) {
        t.equal(data, 'bar')
    })
    _view.emit('foo', 'bar')
})
