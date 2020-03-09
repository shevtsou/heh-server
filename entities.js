const chalk = require('chalk');

const ENTITY_TYPES = {
  BLOCK: 1,
  BACKGROUND: 0,
}

class Entity {
  x
  y
  symbol
  type
  constructor(x, y, symbol, type) {
    this.x = x
    this.y = y
    this.symbol = symbol
    this.type = type
  }
  toString() {
    return this.symbol
  }
}
class User extends Entity {
  static userId = 0
  id

  constructor(name, id, x, y,) {
    super(x, y, chalk.red(name[0]), ENTITY_TYPES.BLOCK)
    this.id = id
    this.name = name
  }

}

class Grass extends Entity {
  constructor(x, y) {
    super(x, y, chalk.hex("#316400")('"'), ENTITY_TYPES.BACKGROUND)
  }
}

module.exports = {
    User,
    Entity,
    ENTITY_TYPES,
    Grass
}
  