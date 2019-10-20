var { h, render } = require('preact')
var connect = require('@nichoth/preact-connect')
var Bus = require('@nichoth/events')
var catchRoutes = require('@nichoth/catch-routes')

// var { struct, observ } = require('./lib')
// var struct = require('observ-struct')
// var Effects = require('./effects')
// var View = require('./view')
// var evs = require('./EVENTS')

// var state = struct({
//     foo: observ('bar'),
//     route: struct({}),
//     homeRoute: struct({
//         hello: observ('world')
//     })
// })

// var bus = Bus({ memo: true })
// var effects = Effects({ state, view: bus })
// var _view = connect({ state, bus, view: View })
// render(h(_view), document.getElementById('content'))

// if (process.env.NODE_ENV === 'development') {
//     window.app = {
//         state,
//         effects,
//         view: bus,
//         evs
//     }

function start (el, state, subscribe) {
    catchRoutes(function (parsedUrl) {
        state.route.set(parsedUrl)
    })

    var bus = Bus({ memo: true })

    var _view = connect({ state, bus, view: View })
    subscribe({ view: bus, state })
    render(h(_view), el)
    return { state, view: bus }
}

module.exports = start
