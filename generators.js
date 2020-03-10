//@ts-check

const { Grass, Field } = require('./entities')


function generateFieldGrass() {
    for (let x = -1000; x < 1000; x++) {
        for (let y = -1000; y < 1000; y++) {
                ENTITIES.add(x, y, new Field(x, y))
        }
    }
}
function generateGrass() {
    for (let x = -1000; x < 1000; x++) {
        for (let y = -1000; y < 1000; y++) {
            if (Math.random() > 0.95) {
                ENTITIES.add(x, y, new Grass(x, y))

            }
        }
    }
}

module.exports = {
    generateFieldGrass,
    generateGrass
}