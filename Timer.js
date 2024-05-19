function Timer(game,gameplay,x,y)
{this.game=game;this.gameplay=gameplay;this.timer=this.game.add.image(x-110*assetScale,y,'assets','time1');this.backgroundT=this.game.add.image(x,y,'assets','time');this.backgroundT.anchor.set(0.5);this.clock=this.game.add.image(x-80*assetScale,y,'assets','time3');this.clock.anchor.set(0.5);this.clock.scale.set(2);this.clock.alpha=0.8;this.clock.initPos={x:this.clock.x,y:this.clock.y};this.clock.x=this.game.world.centerX;this.clock.y=this.game.world.centerY;this.timer.anchor.set(0,0.5);this.timer.alpha=1;this.timer.initialSize=this.timer.width;this.timer.width=0;this.timeLeft=timeOffset;this.AnimateClock();this.ticking=false;}
Timer.prototype.DecreaseTimer=function()
{if(this.gameplay.userControl)
{if(this.timeLeft<timePerSet)
{this.timeLeft+=this.game.time.elapsed;this.timer.width=this.timer.initialSize*((this.timeLeft)/timePerSet);}
else
{this.timer.width=this.timer.initialSize;soundManager.playAudio(sfxAtlas,'alarmClock');this.gameplay.TimerCallback();this.AnimateAngle();}}};Timer.prototype.StartTimer=function()
{this.timerGame.start();};Timer.prototype.AnimateClock=function()
{this.game.add.tween(this.clock).from({alpha:0},1500,Phaser.Easing.Linear.None,true).onComplete.add(function()
{this.game.add.tween(this.clock).to({x:this.clock.initPos.x,y:this.clock.initPos.y},800,Phaser.Easing.Bounce.Out,true,500);this.game.add.tween(this.clock.scale).to({x:1,y:1},800,Phaser.Easing.Linear.None,true,500);this.game.add.tween(this.clock).to({alpha:1},1200,Phaser.Easing.Linear.None,true,500);},this);};Timer.prototype.AnimateAngle=function()
{this.game.add.tween(this.timer).to({angle:2},50,Phaser.Easing.Linear.None,true,0,10,true);this.game.add.tween(this.backgroundT).to({angle:2},50,Phaser.Easing.Linear.None,true,0,10,true);this.game.add.tween(this.clock).to({angle:20},50,Phaser.Easing.Linear.None,true,0,10,true);};Timer.prototype.Hide=function()
{this.game.add.tween(this.timer).to({alpha:0},400,Phaser.Easing.Linear.None,true);this.game.add.tween(this.backgroundT).to({alpha:0},400,Phaser.Easing.Linear.None,true);this.game.add.tween(this.clock).to({alpha:0},400,Phaser.Easing.Linear.None,true);};Timer.prototype.BringToTop=function(){if(this.timer!=null){this.game.world.bringToTop(this.timer);this.game.world.bringToTop(this.backgroundT);this.game.world.bringToTop(this.clock);}};