"use strict"
const _ = require('lodash')
const Chessmen = require('./Chessmen.js')
const constant = require('./Constant')
const myUtils = require('./utils')
class Game {
	constructor(gameConfig) {
    this.gameConfig = gameConfig
    this.count = 0;
    this.gamePath = []
    this.step = []
    this.index = 0   //
    this.gameObject = {}
    this.win = false
  }
  undo() {
    //TODO 
  }
  next() {
    //TODO 
  }
  printf() {
  	myUtils.draw(this.chessboard)
  }
  init () {
    this.chessboard = _.cloneDeep(this.gameConfig.local) //只执行一次 性能瓶颈
  	let gameObj = {}
		for(let i = this.chessboard.length - 1; i >= 0; i--) {
			let row =  this.chessboard[i]
			for(let j =0 ;j < row.length; j++) {
				let node = row[j]
        if(node === '00') continue;
				if(gameObj[node]){
					gameObj[node].addNode(this.chessboard.length - 1-i,j)
				}else{
					gameObj[node] = new Chessmen(node,node,this.chessboard)
					gameObj[node].addNode(this.chessboard.length - 1-i,j)
				}
			}
		}
		for(let nodeKey in gameObj) {
			gameObj[nodeKey].genPostion()
			gameObj[nodeKey].show()
	  }
	  this.gameObject = gameObj
    console.log(constant.INFO.START,this.gameConfig.name)
  }
  move (id,director) {
  	let objKey = id.toString().toUpperCase()
  	let obj = this.gameObject[objKey]
  	if(!obj) {
  		return constant.INFO.OBJ_KEY_ERROR
  	}
  	let ret = obj.move(director)
  	if(!ret){
  		this.step.push([id,director])
      this.index++  // 指针变量 用于undo 操作
  	}
    this.isWin()
  	return ret
  }
  isWin () {
    let chessment = this.gameObject['D1']
    if(chessment.x === 6 && chessment.y === 2) {
      this.win = true
      return true
    }
    return false
  }
  getHash () {
    let str =[]
    this.chessboard.forEach(row=>{
      row.forEach(item=>{
        str.push(item.substring(0,1))
      })
    })
    return str
  }
  clone()  {
    let newGame = new Game(this.gameConfig)
    let array = myUtils.cloneArray(this.chessboard)
    newGame.chessboard = array
    for(let key in this.gameObject) {
      let obj = this.gameObject[key].clone(array)
      newGame.gameObject[key] = obj
    }
    return newGame
  }
}
module.exports = Game