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
            let symbol = undefined
            let color = undefined
            let bgColor = undefined

            for (let entity of entities) {
                if (symbol === undefined) {
                    symbol = entity.symbol
                }
                if (color === undefined) {
                    color = entity.color
                }
                if (bgColor === undefined) {
                    bgColor = entity.bgColor
                }
            }
            result += chalk.bgHex(bgColor).hex(color)(symbol)
        }
        result += '\n'
    }
    return result
}


module.exports = {
    getField
}