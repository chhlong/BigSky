//光卡表
//[光卡1] = {[前期] = {【目标数】=100，刷怪物随机间隔=0.5,【怪物】={【怪物1】={个数}，【怪物2】={个数}}，[后期] = {【目标数】=50，刷怪物随机间隔=0.1,,【怪物】={【怪物1】={个数}，【怪物2】={个数}}}
//monsters:[怪物id,数量,间隔时间]

var stageConfig = new Array()

stageConfig[0] = {id:0, name:"Level1", phase:[ {killNums:10, monsters:[[0,5,0.5],[1,5,0.5]]}, {killNums:10, monsters:[[0,5,0.5],[1,5,0.5]]}]}
stageConfig[1] = {id:1, name:"Level2", phase:[ {killNums:10, monsters:[[0,5,0.5],[1,5,0.5]]}, {killNums:10, monsters:[[0,5,0.5],[1,5,0.5]]}]}
stageConfig[2] = {id:2, name:"Level3", phase:[ {killNums:10, monsters:[[0,5,0.5],[1,5,0.5]]}, {killNums:10, monsters:[[0,5,0.5],[1,5,0.5]]}]}
stageConfig[3] = {id:3, name:"Level4", phase:[ {killNums:10, monsters:[[0,5,0.5],[1,5,0.5]]}, {killNums:10, monsters:[[0,5,0.5],[1,5,0.5]]}]}
stageConfig[4] = {id:4, name:"Level5", phase:[ {killNums:10, monsters:[[0,5,0.5],[1,5,0.5]]}, {killNums:10, monsters:[[0,5,0.5],[1,5,0.5]]}]}
stageConfig[5] = {id:5, name:"Level6", phase:[ {killNums:10, monsters:[[0,5,0.5],[1,5,0.5]]}, {killNums:10, monsters:[[0,5,0.5],[1,5,0.5]]}]}

module.exports = stageConfig
