'use strict';
const fs = require('fs')
const _ = require('lodash')
const _path = require('path')
class GameReader {
	constructor(gamepath) {
    this.gamePath = gamepath
    this.gameList={}
    this.init()
  }
  init() {
  	let paths = fs.readdirSync(this.gamePath)
  	paths.forEach(item=>{
  		let tmp = require(_path.join(this.gamePath,item))
  		tmp.id = _path.parse(item).name
  		this.gameList[_path.parse(item).name] = tmp
  	})
  }
  show() {
  	let self = this
  	_.chain(this.gameList).keys().sort().value().forEach(item=>{
  		console.log(item,self.gameList[item].name)
  	})
  }
  getGame(gameId) {
  	return this.gameList[gameId]
  }
}
module.exports = GameReader