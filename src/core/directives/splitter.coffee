{classFn} = require '../property'
{pairListDict} = require '../../util'
# to avoid loop dependency, do not require below at the head of this file
#  '../base' -> '../directive' -> './directives' -> this file
{Component} = require('../base')
{div, span} = require '../tag'
{show} = require '../directives'

#splitter
module.exports = (direction) -> (comp) ->

  attrs = comp.attrs
  direction = direction or 'vertical'

  if direction == 'vertical'
    left = "top"; right = "bottom"; width = "height"; clientX = "clientY"; splitbarClass =  "splitbarH"; buttonClass = "splitbuttonH"; cursor = "s-resize"
  else
    left = "left"; right = "right"; width = "width"; clientX = "clientX"; splitbarClass =  "splitbarV"; buttonClass = "splitbuttonV"; cursor = "e-resize"

  pos = 200; percent = 0.5; size = null; drag = false;

  getSize = -> size or 600

  children = comp.children.children
  paneA = children[0]; paneB = children[1]
  minAWidth = attrs.minAWidth or 0; minBWidth = attrs.minBWidth or 0
  splitBarAttr = {
    "class": splitbarClass,  unselectable: "on",
    style: splitBarAttrCss = {
      "cursor": cursor, "user-select": "none", "-webkit-user-select": "none",
      "-khtml-user-select": "none", "-moz-user-select": "none" } }
  splitBarAttrCss[left] =  -> pos+'px'
  splitBarAttrCss[width] = barsize = 6

  arrowAHovering = false
  arrawAAttr =  {
    "class": classFn(buttonClass, {'inactive': -> arrowAHovering}),
    unselectable: "on",
    style: {cursor: 'pointer'}
    onmouseover: -> arrowAHovering = true; comp.update()
    onmouseleave: -> arrowAHovering = false; comp.update()
    onclick: (e) -> pos = minAWidth; comp.update()
    directives:show(-> pos > minAWidth)
  }
  arrowBHovering = false
  arrawBAttr =  {
    "class": classFn(buttonClass+' invert', {'inactive': -> arrowBHovering}),
    unselectable: "on"
    style:{cursor: 'pointer'}
    onmouseover: -> arrowBHovering = true; comp.update()
    onmouseleave: -> arrowBHovering = false; comp.update()
    onclick: (e) -> pos = getSize()-minBWidth; comp.update()
    directives:show(-> getSize()-pos>minBWidth)
  }
  arrowA = div(arrawAAttr)
  arrowB = div(arrawBAttr)

  children[2] = paneB
  children[1] = splitBar = div(splitBarAttr, span(), arrowA, arrowB)

  splitBar.bind 'mousedown', (ev) -> drag = true
  dc(document).bind 'mouseup', -> drag = false
  comp.bind 'mousemove', (ev) ->
    event.continuePropagation = true
    event.executeDefault = true
    if (!drag) then return
    event.continuePropagation = false
    event.executeDefault = false
    bounds = comp.node.getBoundingClientRect()
    size = w = bounds[right] - bounds[left]
    pos = Math.max(ev[clientX] - bounds[left], 0)
    pencent = pos/w
    comp.update()

  paneA.css pairListDict('position', 'absolute', width, (-> pos+'px'))
  paneB.css pairListDict('position', 'absolute', left, (-> (pos+barsize)+'px'), width, (-> getSize()-(pos+barsize)+'px') )
  comp.css pairListDict 'position', 'absolute'

  comp.bind 'resize', (ev) ->
    ev.preventDefault()
    ev.stopPropagation()
    bounds = comp.node.getBoundingClientRect()
    w = bounds[right] - bounds[left]
    pos = percent*w
    if pos < minAWidth
      pos = minAWidth
    else if w-pos < minBWidth
      pos = w-minBWidth
    comp.update()

  comp