var ok = require('../')
var test = require('tape')
var struct = require('observ-struct')
var observ = require('observ')
var { h } = require('preact')

function View (props) {
    return <div>view</div>
}

function sub ({ state, view }) {
}

var state = struct({
    hello: observ(null),
    route: observ(null)
})

var el = document.body

test('start', function (t) {
    var { view } = ok(state, View, el)
    sub({ state, view })
    t.ok(view, 'returns')
    t.end()
})
