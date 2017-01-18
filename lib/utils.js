'use strict'
const constant = require('./Constant')
const draw = function(paint){
	paint.forEach(item=>{
		let str = ""
		item.forEach(i=>{
			if(i === '00'){
				str+='  '
			}else{
				str +=i
			}
		})
		console.log(str)	
	})
}
const cloneArray = function(array){
	let cb = []
  for(let i =0 ; i < array.length;i++){
    let tmp = []
    for(let j =0 ; j <  array[i].length;j++){
      tmp.push(array[i][j])
    }
    cb.push(tmp)
  }
  return cb
}
const validate_director = function (director) {
	let type;
 	for(let key in constant.DIRECTOR) {
 		if(key == director){
 			type = constant.DIRECTOR[key]
 			break;
 		}
 		if(constant.DIRECTOR[key].alias.indexOf(director) > -1){
 			type = constant.DIRECTOR[key]
 			break
 		}
 	}	
 	return type
}
const getMove_to_Pos = function (nodes,weight,height,type) {
	let dir = [0,0]
	switch(type) {
 		case 'UP':
 		dir = [0,2]
 		break;
 		case 'DOWN':
 		dir = [0,-2]
 		break;
 		case 'LEFT':
 		dir = [-2,0]
 		break;
 		case 'RIGHT':
 		dir = [2,0]
 		break;
 		default:
 		throw new Error('type')
 		break
 	}
 	let ret = []
 	nodes.forEach(node=> {
 		ret.push([node[0] + dir[0],node[1] + dir[1]])
 	})
 	return ret
}
module.exports.getMove_to_Pos = getMove_to_Pos
module.exports.draw = draw
module.exports.cloneArray = cloneArray
module.exports.validate_director = validate_director