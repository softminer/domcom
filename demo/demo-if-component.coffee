{list, if_, text} = require 'domcom/src/index'

module.exports = ->
  x = 0
  comp = list(text({onchange: -> x = parseInt(@value); comp.update()}, x), if_((->x), div(1), div(2)))
#  comp = list(text({onchange: -> x = @value; comp.update()}, (->x)), div(->x))
#  comp = list(number({onchange: -> x = parseInt(@value); comp.update()}, (->x) ), div(->x), if_((-> x), div(1), div(2)))
  comp.mount()