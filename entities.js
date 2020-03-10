const chalk = require('chalk');

const ENTITY_TYPES = {
  BLOCK: 2,
  TOP_BACKGROUND: 1,
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
  health

  constructor(name, id, x, y,) {
    super(x, y, chalk.red(name[0]), ENTITY_TYPES.BLOCK)
    this.id = id
    this.name = name
    this.health = 100
  }

}

class Grass extends Entity {
  constructor(x, y) {
    super(x, y, chalk.hex("#316400")('"'), ENTITY_TYPES.BACKGROUND)
  }
}

class RIP extends Entity {
  constructor(x, y) {
    super(x, y, chalk.hex("#000000")('+'), ENTITY_TYPES.BLOCK)
  }
}

class Blood extends Entity {
  constructor(x, y) {
    super(x, y, chalk.hex("#8a0303")('.'), ENTITY_TYPES.TOP_BACKGROUND)
  }
}

class Shot extends Entity {
  constructor(x, y) {
    super(x, y, chalk.hex("#000000")('.'), ENTITY_TYPES.TOP_BACKGROUND)
  }
}
module.exports = {
    User,
    Entity,
    ENTITY_TYPES,
    Grass,
    RIP,
    Blood,
    Shot
}
  