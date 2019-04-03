window.Global = {
  DataBus : null,
  performWithDelay : null,
  ScoreLbl : null,
  CurHero : null,
  BoomMgr : null,
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


