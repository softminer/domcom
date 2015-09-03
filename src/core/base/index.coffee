route = require './route'
module.exports =
  isComponent: require './isComponent'
  toComponent: require './toComponent'
  Component: require './component'
  BaseComponent: require './BaseComponent'
  Nothing: require './Nothing'
  List: require './List'
  Tag: require './Tag'
  Text: require './Text'
  Comment: require './Comment'
  Html: require './Html'
  TransformComponent: require './TransformComponent'
  If: require './If'
  Case: require './Case'
  Func: require './Func'
  Repeat: require './Repeat'
  Router: route.Router
  route: route