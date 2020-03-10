//@ts-check
var express = require('express');
var app = express();
const map = require('./map')
const { User, Entity, Grass, RIP, Blood, Shot } = require('./entities')
const { generateGrass } = require('./generators')
const PASSWORD = "1234"

global.ENTITIES = []
global.USERS = {

}
ENTITIES.get = (x, y) => {
  if (ENTITIES[x]) {
    if (ENTITIES[x][y]) {
      return ENTITIES[x][y].sort((a, b) => b.type - a.type);
    } else {
      return []
    }
  } else {
    return []
  }
  
}

ENTITIES.add = (x, y, entity) => {
  if (!ENTITIES[x]) {
    ENTITIES[x] = []
  }
  if (!ENTITIES[x][y]) {
    ENTITIES[x][y] = []
  }
  // console.log(ENTITIES[x][y])
  ENTITIES[x][y].push(entity)
}
ENTITIES.set = (x, y, entities) => {
  if (!ENTITIES[x]) {
    ENTITIES[x] = []
  }
  ENTITIES[x][y] = entities
}


ENTITIES.move = (entity, fromX, fromY, toX, toY) => {
  const entities = ENTITIES.get(fromX, fromY)
  ENTITIES.set(fromX, fromY, ENTITIES.get(fromX, fromY).filter(e=>e !== entity))
  ENTITIES.add(toX, toY, entity)
}

ENTITIES.remove = (entity) => {
  const fromX = entity.x;
  const fromY = entity.y
  ENTITIES.set(fromX, fromY, ENTITIES.get(fromX, fromY).filter(e=>e !== entity))
}

ENTITIES.findUser = (userId) => USERS[id]

generateGrass()

app.use(express.json()) 
app.post('/registerUser', (req, res) => {
  const {name, password} = req.body
  if (password !== PASSWORD) {
    res.send({status: 'PISHOU NAHUI'})
  } else {
    const user = new User(name, User.userId++)
    // user.x = Math.floor(Math.random() * WIDTH)
    // user.y = Math.floor(Math.random() * HEIGHT)
    USERS[user.id] = user
    ENTITIES.add(5, 5, user)
    user.x = 5
    user.y = 5
    res.send(user)
  }
  
})

app.post('/info', function (req, res) {
  const { userId} = req.body;
  const user = USERS[userId]
  res.send({
    x: user.x,
    y: user.y
  })
})
app.post('/field', function (req, res) {
    const { userId, x, y } = req.body;
    res.send({
      value: map.getField(x, y)
    })
});

function addRandomBlood(enemy) {
  for (let x2 = -1; x2 <= 1; x2++) {
    for (let y2 = -1; y2 <= 1; y2++) {
      if (Math.random() > 0.7) {
        ENTITIES.add(enemy.x + x2, enemy.y + y2, new Blood(enemy.x + x2, enemy.y + y2))
      }
    }
  }
}

function findUserAndKill(x, y) {
  const enemy = ENTITIES.get(x, y).find(e=>e instanceof User)
  if (!enemy) {
    return false;
  }
  enemy.health -= 20;
  if (enemy.health <= 0) {
    ENTITIES.remove(enemy)
    ENTITIES.add(enemy.x, enemy.y, new RIP(enemy.x, enemy.y))
  }
  addRandomBlood(enemy)
  return true;
}

app.post('/do', function (req, res) {
  const { action, userId } = req.body;
  const user = USERS[userId]
  if (!user) {
    res.send('NO SUCH USER')
    return;
  }
  switch (action) {
    case 'a': 
        ENTITIES.move(user, user.x, user.y, user.x - 1, user.y)
        user.x--
      break;
    case 'w': 
    ENTITIES.move(user, user.x, user.y, user.x, user.y - 1)
      user.y--
      break;
    case 'd': 
    ENTITIES.move(user, user.x, user.y, user.x + 1, user.y)
        user.x++
      break;
    case 's': 
    ENTITIES.move(user, user.x, user.y, user.x, user.y + 1)
      user.y++
      break;
    case 'i':
      for (let diff = 1; diff < 30; diff++) {
        if (findUserAndKill(user.x, user.y  - diff)) {
          break;
        }
      }
      break;
    case 'j':
      for (let diff = 1; diff < 30; diff++) {
        if (findUserAndKill(user.x - diff, user.y)) {
          break;
        }
      }
      break;
    case 'l':
      for (let diff = 1; diff < 30; diff++) {
        if (findUserAndKill(user.x + diff, user.y)) {
          break;
        }
      }
      break;
    case 'k':
      for (let diff = 1; diff < 30; diff++) {
        if (findUserAndKill(user.x, user.y  + diff)) {
          break;
        }
      }
      break;
    default:
      res.send('NO SUCH OP')
      return
  }
  res.send('DONE')
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
//51x15
