{list, if_, text, div, see } = dc

module.exports = ->
  x = see 0, parseInt
  comp = list(text({onchange: -> x = parseInt(@value); comp.update()}, x), if_(x, div(1), div(2)))
#  comp = list(text({onchange: -> x = @value; comp.update()}, (->x)), div(->x))
#  comp = list(number({onchange: -> x = parseInt(@value); comp.update()}, (->x) ), div(->x), if_((-> x), div(1), div(2)))
  # comp.mount()

module.exports = ->
  x = see 0, parseInt
  three = div 3
  comp = list(text({onchange: -> x = parseInt(@value); comp.update()}, x), if_(x, div(1, three), div(2, three)))
