const chalk = require('chalk');

const ENTITY_TYPES = {
  BLOCK: 2,
  TOP_BACKGROUND: 1,
  BACKGROUND: 0,
  BOTTOM_BACKGROUND: -1,
}

class Entity {
  x
  y
  color
  bgColor
  symbol
  type
  constructor(x, y, symbol, foregraund, background, type) {
    this.x = x
    this.y = y
    this.color = foregraund
    this.bgColor = background
    this.symbol = symbol
    this.type = type
  }
  toString() {
    let result = this.symbol
    if (this.color) {
      result = chalk.hex(this.color)
    }
    if (this.bgColor) {
      result = chalk.hex(thiis.bgColor)
    }
    return result
  }
}
class User extends Entity {
  static userId = 0
  id
  health

  constructor(name, id, x, y,) {
    super(x, y, name[0], '#FFE0BD', undefined, ENTITY_TYPES.BLOCK)
    this.id = id
    this.name = name
    this.health = 100
  }

}
class Field extends Entity {
  constructor(x, y) {
    super(x, y, ' ', '#4e7028', '#4e7028', ENTITY_TYPES.BOTTOM_BACKGROUND);
    
  }
  
}

class Grass extends Entity {
  constructor(x, y) {
    super(x, y, '"', "#316400", undefined, ENTITY_TYPES.BACKGROUND)
  }
}

class RIP extends Entity {
  constructor(x, y) {
    super(x, y, '+', "#000000", undefined, ENTITY_TYPES.BLOCK)
  }
}

class Blood extends Entity {
  constructor(x, y) {
    super(x, y, '.', "#8a0303", undefined, ENTITY_TYPES.TOP_BACKGROUND)
  }
}

class Shot extends Entity {
  constructor(x, y) {
    super(x, y, '.', "#000000", undefined, ENTITY_TYPES.TOP_BACKGROUND)
  }
}

module.exports = {
    User,
    Entity,
    ENTITY_TYPES,
    Grass,
    RIP,
    Blood,
    Shot,
    Field
}
  