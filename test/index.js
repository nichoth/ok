var test = require('tape')
var ok = require('../')
var struct = require('observ-struct')
var observ = require('observ')
var { h } = require('preact')

function View (props) {
    return <div>view</div>
}

function sub () {
}

var state = struct({
    hello: observ(null),
    route: observ(null)
})

var el = document.body

test('example', function (t) {
    var { view } = ok(state, sub, View, el)
    t.ok(view, 'returns')
    t.end()
})

