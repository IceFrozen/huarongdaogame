"use strict"
const constant  = require('./Constant')
const myUtils = require('./utils')
class Chessmen {
	constructor(name,type,chessboard) {
    	this.uuid = name
    	this.type = type.substring(0,1)
    	this.chessboard = chessboard
    	this.x = 0
    	this.y = 0
    	this.w = 0
    	this.h = 0
    	this.node= []
  }
  addNode (i,j) {
  	this.node.push([j,i])
  }
  genPostion () {
  	let start = this.node[0]
  	let end = this.node[this.node.length-1]
  	this.x = start[1]
  	this.y = start[0]
  	this.w = Math.abs(start[0] - end[0]) + 1
  	this.h = Math.abs(start[1] - end[1]) + 1
  }
  show () {
  }
  genCoverPos () {
 	  this.node = []
  }
  move (director){
 	  let type = myUtils.validate_director(director)
 	  if(!type){
 		 return constant.INFO.DIRECTOR_ERROR
 	  }
 	  const move_to_cover = myUtils.getMove_to_Pos(this.node,this.w,this.h,type.type)
 	  if(this.isEmpaty(move_to_cover)){
 			this.action(move_to_cover)
 	  }
  }
  action(move_to_cover) {
    for(let i =0 ; i < this.node.length;i++){
      let item = this.node[i]
      let tmppos_x = this.chessboard.length -1- item[1]
      let tmp_y = item[0]
      this.chessboard[tmppos_x][tmp_y] = "00"
    }
    for(let i =0 ; i < move_to_cover.length;i++){
      let item = move_to_cover[i]
      let tmppos_x = this.chessboard.length -1- item[1]
      let tmp_y = item[0]
      this.chessboard[tmppos_x][tmp_y] = this.uuid  
    }
    this.node = move_to_cover
    this.genPostion()
 }
  isEmpaty(move_to_cover) {
 	  for(let i =0 ; i < move_to_cover.length;i++){
 			let item = move_to_cover[i]
 			let tmp_x = this.chessboard.length -1- item[1]
 			let tmp_y = item[0]
      if(tmp_x < 0 || tmp_y > 7 || tmp_y <0 || tmp_x > 9)  return false
 			if(this.chessboard[tmp_x][tmp_y] !== '00' && this.chessboard[tmp_x][tmp_y] !== this.uuid){
 				return false
 			}
 	  }
 	  return true
  }
 clone (array) {
    let cs = new Chessmen(this.uuid,this.type,array)
    cs.x = this.x
    cs.y = this.y
    cs.w = this.w
    cs.h = this.h
    cs.node = this.node
    return cs
  }
}
module.exports = Chessmen


