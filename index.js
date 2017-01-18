const vorpal = require('vorpal')();
const GameReader = require('./lib/GameReader.js')
const Game = require('./lib/CurrentGame.js')
const constant = require('./lib/Constant')
const AutoSolution = require('./lib/AutoSolution')
const path = __dirname + '/games/'
const clear = require('clear')
var gameReader = new GameReader(path)
var Gloable = {
	isBegin:true,
	count:0,
	currentGame:1,
	gameReader:gameReader,
	auth:null,
	current:null
}
vorpal
  .command('list', constant.INFO.LIST)
  .description(constant.INFO.LIST_DES)
  .action((args, callback) => {
    Gloable.gameReader.show()
    callback();
  });
vorpal
  .command('start', constant.INFO.START)
  .option('-m, --mission <missname>', constant.INFO.START_M)
  .description(constant.INFO.START_DES)
  .action((args, callback)=>{
    let gameId = args.options.mission || Gloable.currentGame
   	let gameConfig = Gloable.gameReader.getGame(gameId.toString())
   	if(!gameConfig){
   		this.log(constant.INFO.MISSION_FAILD_FIND)
   		return callback()
   	}
   	Gloable.isBegin = true
   	Gloable.current = new Game(gameConfig)
   	Gloable.current.init()
   	Gloable.current.printf()  
   	callback()
  });
vorpal
  .command('auto', constant.INFO.AUTO)
  .option('-m, --mission <missname>', constant.INFO.AUTO_M)
  .description(constant.INFO.AUTO_DES)
  .action((args, callback)=>{
    let gameId = args.options.mission || Gloable.currentGame
   	let gameConfig = Gloable.gameReader.getGame(gameId.toString())
   	if(!gameConfig){
   		this.log(constant.INFO.MISSION_FAILD_FIND)
   		return callback()
   	}
   	if(!Gloable.current) {
   		Gloable.isBegin = true
   		Gloable.current = new Game(gameConfig)
   		Gloable.current.init()
   	}
   	Gloable.auto = new AutoSolution(Gloable.current)
   	Gloable.auto.search()
   	Gloable.auto.showPath()
   	callback()
  });

vorpal
  .command('move <obj> <direct>', constant.INFO.MOVE)
  .description(constant.INFO.MOVE_DES)
  .action((args, callback) => {
  	if(!Gloable.isBegin){
  		this.log(constant.INFO.START_GAME_FRIST)
  		return callback()
  	}
  	let result = Gloable.current.move(args.obj,args.direct)
   	if(result){
   		console.log(result)
   	}else{
   		clear()
   	}
    Gloable.current.printf()  //打印当前输出
   	if(Gloable.current.win) {
   		this.log(onstant.INFO.SUCCESS)
   	}
   	callback()
  });
vorpal
  .command('stop', constant.INFO.STOP)
  .description(constant.INFO.STOP_DES)
  .action((args, callback) => {
    this.log(constant.INFO.WELCOME_NEXT)
    process.exit()
  });
vorpal
  .delimiter('game$')
  .show();
