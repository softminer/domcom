#chai = require('chai')

exports.expect = chai.expect

exports.iit = it.only
exports.idescribe = describe.only
exports.nit = ->
exports.ndescribe = ->

exports.rtimeout = (ms, fn) -> setTimeout(fn, ms)
exports.rinterval = (ms, fn) -> setInterval(fn, ms)

exports.newDemoNode = (id) ->
  node = document.createElement('div')
  document.body.appendChild(node)
  id and node.setAttribute('id', id)
  node