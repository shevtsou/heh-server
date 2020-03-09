const { User } = require('./entities')
const chalk = require('chalk');
const {ENTITY_TYPES} = require('./entities')

const WIDTH = 55
const HEIGHT = 15

const getField = (coordinateX, coordinateY) => {
    let result = ""
    for (let y = Math.floor(coordinateY - HEIGHT / 2); Math.floor(y < coordinateY + HEIGHT /2) ; y++) {
        for (let x = Math.floor(coordinateX - WIDTH / 2); Math.floor(x < coordinateX+ WIDTH / 2); x++) {
            const entities = ENTITIES.get(x, y)
            let symbol = " "
            let bgColor = "#4e7028"
            for (let entity of entities) {
                if (symbol === ' ') {
                    symbol = entity.symbol
                }
            }
            result += chalk.bgHex(bgColor)(symbol)
        }
        result += '\n'
    }
    return result
}


module.exports = {
    getField
}