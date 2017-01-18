## Overview  
- 华容道游戏 
- This is a strategy game, called the Huarong Road
## characteristic:    
- breadth-first search          广度优先搜索
- automatic search              自动解题
- not optimum solution         不是最优解
- fast                         快速（横刀立马 2s 内解题）

## Uasge: 
- git clone https://github.com/IceFrozen/huarongdaogame.git
- npm install 
- node .  或者  node index.js

## Quick Start: 
```javascript
    game$ list
        1 横刀立马
        2 横刀立马2
        
    game$  start -m 1
        开始游戏 横刀立马
        A1A1A2A2A3A3A4A4
        A1A1A2A2A3A3A4A4
        B1B1C1C1C1CB2B2
        B1B1        B2B2
        B1B1C1C1C1C1B2B2
        B1B1C1C1C1C1B2B2
        B3B3D1D1D1D1B4B4
        B3B3D1D1D1D1B4B4
        B3B3D1D1D1D1B4B4
        B3B3D1D1D1D1B4B4
        
    game$  move c1 up
        A1A1A2A2A3A3A4A4
        A1A1A2A2A3A3A4A4
        B1B1C1C1C1C1B2B2
        B1B1C1C1C1C1B2B2
        B1B1        B2B2
        B1B1        B2B2
        B3B3D1D1D1D1B4B4
        B3B3D1D1D1D1B4B4
        B3B3D1D1D1D1B4B4
        B3B3D1D1D1D1B4B4
```
## 增加游戏
 放到 games 目录下  文件格式  [游戏编号].json 
 D1 为曹操 不可变
 出口为 A2 - A3 位置
 实例如下  见 ./games/1.json
```javascript
    {
	"name":"横刀立马",
	"local":[
			["A1","A1","A2","A2","A3","A3","A4","A4"],
			["A1","A1","A2","A2","A3","A3","A4","A4"],
			["B1","B1","00","00","00","00","B2","B2"],
			["B1","B1","00","00","00","00","B2","B2"],
			["B1","B1","C1","C1","C1","C1","B2","B2"],
			["B1","B1","C1","C1","C1","C1","B2","B2"],
			["B3","B3","D1","D1","D1","D1","B4","B4"],
			["B3","B3","D1","D1","D1","D1","B4","B4"],
			["B3","B3","D1","D1","D1","D1","B4","B4"],
			["B3","B3","D1","D1","D1","D1","B4","B4"]
	]
}
```
## API 
```
    命令   
    help 查看游戏
    start 开始游戏
        start -m [游戏编号]  例如 start -m 1
    move [棋子id] [方向]
        方向  见 lib constant.js 中的 DIRECTOR
            up  down  left right
            u   d     l    r 
            w   s     a    d
        ex：
            move c1 up      or  move c1 u 
			move a1 down    or  move a1 d
			move a2 left    or  move a2 l
			move a3 right   or  move a3 r
	auto -m [游戏编号]
	        auto -m 1    //自动解题 1
```
## About The Author  
**Auther**: Jason Lee  
**Mail**: taozi031@163.com  