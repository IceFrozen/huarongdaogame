const gameReader = require('../lib/GameReader.js')
const Game = require('./lib/CurrentGame.js')
const constant = require('../lib/Constant')
const AutoSolution = require('../lib/AutoSolution')
let path = __dirname + '/games/'
let path = '../games'
var gr = new gameReader(path)
gr.show()



const game = new Game(gr)
game.init()
game.printf()  



var auto = new AutoSolution(game)
auto.search()
auto.showPath()