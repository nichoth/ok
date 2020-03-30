var { h, render } = require('preact')
var connect = require('@nichoth/preact-connect')
var Bus = require('@nichoth/events')
var catchRoutes = require('@nichoth/catch-routes')

function start (state, view, el) {
    var bus = Bus({ memo: true })
    var onRoute = []

    catchRoutes(function (parsedUrl) {
        state.route.set(parsedUrl)
        onRoute.forEach(function (handler) {
            handler(parsedUrl)
        })
    })

    if (el) {
        var _view = connect({ state, bus, view })
        render(h(_view), el)
    }

    function routes (handler) {
        onRoute.push(handler)
    }

    return { state, view: bus, routes }
}

module.exports = start

