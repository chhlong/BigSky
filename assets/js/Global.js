window.Global = {
  DataBus : null,
  performWithDelay : null,
  ScoreLbl : null,
  curPlayer : null,
  BoomMgr : null,
  BulletMgr: null,
}

window.Global.performWithDelay = function(target, delay, callback){
	var delay = cc.delayTime(delay)
    var sequence = cc.sequence(delay, cc.callFunc(callback, target))
    target.node.runAction(sequence)
    return sequence
}

window.Global.destroyAllChildren = function(target){
	var nodes = target.children;
	for ( let i = 0, il = nodes.length; i < il; i++ ) {
		nodes[i].destroy()
	}
}


 window.Global.RandomNumBoth = function(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

var skillConfig = new Array(8)

skillConfig[0] = {name:"Hero01_Bullet", intervalTime:0.2, angle:60, speed:1, cdTime:3, durTime:8, damage:10}
skillConfig[1] = {name:"Hero01_Bullet1",intervalTime:0.2, angle:60, speed:1, cdTime:3, durTime:8, damage:10}
skillConfig[2] = {name:"Hero01_Bullet2",intervalTime:0.2, angle:60, speed:1, cdTime:3, durTime:8, damage:10}
skillConfig[3] = {name:"Hero01_Bullet3",intervalTime:0.2, angle:60, speed:1, cdTime:3, durTime:8, damage:10}

skillConfig[4] = {name:"Hero02_Bullet", intervalTime:0.2, angle:60, speed:1, cdTime:3, durTime:8, damage:10}
skillConfig[5] = {name:"Hero02_Bullet1",intervalTime:0.2, angle:60, speed:1, cdTime:3, durTime:8, damage:10}
skillConfig[6] = {name:"Hero02_Bullet2",intervalTime:0.2, angle:60, speed:1, cdTime:3, durTime:8, damage:10}
skillConfig[7] = {name:"Hero02_Bullet3",intervalTime:0.2, angle:60, speed:1, cdTime:3, durTime:8, damage:10}



window.Global.skillConfig = skillConfig
