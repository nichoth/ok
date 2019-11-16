var { h, render } = require('preact')
var connect = require('@nichoth/preact-connect')
var Bus = require('@nichoth/events')
var catchRoutes = require('@nichoth/catch-routes')
// var Router = require('ruta3')
// var observ = require('observ')

function start (state, view, el) {
    catchRoutes(function (parsedUrl) {
        state.route.set(parsedUrl)
    })

    var bus = Bus({ memo: true })

    var _view = connect({ state, bus, view })
    render(h(_view), el)
    return { state, view: bus }
}

module.exports = start
