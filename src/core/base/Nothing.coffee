BaseComponent = require './BaseComponent'
{newLine} = require '../../util'

module.exports = class Nothing extends BaseComponent
  constructor: ->
    super

    @firstNode = null
    @family = Object.create(null)
    @baseComponent = @

  createDom: -> @node = []

  updateDom: -> @node

  attachNode: (parentNode, nextNode) -> @node

  clone: (options) -> (new Nothing())

  toString: (indent=2, addNewLine) -> newLine("<Nothing/>",  indent, addNewLine)