"use strict"
const _ = require('lodash')
const generateId = require('time-uuid');
const constant  = require('./Constant')
const myUtils = require('./utils')
class AutoSolution {
	constructor(game) {
    this.game = game
    this.status = {}        
    this.chessmenStatus_type ={}  
    this.cost_time = 0
    this.waitScanf = []
    this.flag = true
    this.timer = void 0
    this.finalPath = []
  }
  init () {
    this.cost_time = Date.now()
    let chessmenStatu = new ChessmenStatus(this,this.game)
    this.chessmenStatus_type[chessmenStatu.getHash()] = chessmenStatu
    this.status[chessmenStatu.statusId] = chessmenStatu
    this.waitScanf.push(chessmenStatu.statusId)
    this.cost_time = Date.now()
  }
  search () {
    this.init()
    console.time("cost_time")
    while(this.flag) {
      let total_tmp 
      for(let i = 0 ; i< this.waitScanf.length; i++) {
        let s = this.status[this.waitScanf[i]]     
        if(s.win) {
          console.log("SUCCESS")
          this.flag = false
          this.finalPath = s.paths
          this.cost_time = Date.now() - this.cost_time
          break 
        }
        if(s.check) {
          continue; 
        }
        let tmp = s.search()
        total_tmp = _.assign(total_tmp, tmp);   //TODO wait Optimization
      }
      this.waitScanf = _.keys(total_tmp)
      this.status = _.assign(this.status,total_tmp)
    }
    console.timeEnd('cost_time')
  }
  contains (hash) {
    return !!this.chessmenStatus_type[hash]
  }
  showPath (callback) {
    let self = this
    if(this.timer){
      clearInterval(self.timer)
    }
    let tm = 0
    this.timer = setInterval(function(argument) {
      if(tm > self.finalPath.length - 1){ 
        clearInterval(self.timer)
        return 
      }
      let no = self.finalPath[tm]
      let cs = self.status[no]
      console.log("")
      cs.game.printf()
      console.log("step:=================>" + tm)
      console.log()
      tm++
    },1000)
  } 
}
class ChessmenStatus {
  constructor(autoSolution,game,parentId=0){
    this.autoSolution = autoSolution
    this.statusId = generateId() 
    this.parent = parentId      
    this.subStatus = {}         
    this.game = game 
    this.check = false          
    this.paths= [this.statusId]
    this.win = false
  }
  search () {
    let nodes = this.game.gameObject
    for(let key in nodes) {
      let chessment = nodes[key]
      for(let directorKey in  constant.DIRECTOR) {
        let director  = constant.DIRECTOR[directorKey];
        let move_to = myUtils.getMove_to_Pos(chessment.node,chessment.w,chessment.h,director.type)
        if(chessment.isEmpaty(move_to)) {
          //let game_tmp = _.cloneDeep(this.game) TODO 性能瓶颈
          let game_tmp = this.game.clone()  //TODO 性能瓶颈
          game_tmp.gameObject[chessment.uuid].action(move_to)
          let cs = new ChessmenStatus(this.autoSolution,game_tmp,this.statusId)
          let hash = cs.getHash()
          if(!this.autoSolution.contains(hash)){
            cs.setPath(this.paths);
            this.autoSolution.chessmenStatus_type[hash] = cs
            this.subStatus[cs.statusId] = cs
          }
          if(game_tmp.isWin()) {
            cs.win = true
            return this.subStatus
          }
        }
      }
    }
    this.check = true
    return this.subStatus
  }
  getHash () {
    return _.join(this.game.getHash(),'')
  }
  setPath (path) {
    this.paths = []
    for(let i =0 ; i < path.length; i++ ){
      this.paths.push(path[i])
    }
    this.paths.push(this.statusId)
    return this
  }
}
module.exports = AutoSolution


