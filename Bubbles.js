function Bubbles(game,gameplay,asParticle)
{this.game=game;this.gameplay=gameplay;if(asParticle)
{this.CreateParticleEffect();}
else
{this.container=this.game.add.physicsGroup(Phaser.Physics.ARCADE);}}
Bubbles.prototype.GenerateItem=function()
{var fontSize=150*assetScale;var style={font:fontSize+'px '+'Chelsea Market',fill:'#fa9b62',align:'center'};var auxItem;switch(this.game.rnd.integerInRange(1,4))
{case 1:auxItem=this.container.create(positions.left.x*assetScale,this.game.rnd.integerInRange(positions.left.y[0],positions.left.y[1])*assetScale,'assets','bubble');auxItem.body.velocity.set(this.game.rnd.integerInRange(bubblesVelocity[0],bubblesVelocity[1])*assetScale,((((positions.left.y[0]+positions.left.y[1])/2)*assetScale)-auxItem.y)%(bubblesMedia*assetScale));break;case 2:auxItem=this.container.create(this.game.rnd.integerInRange(positions.top.x[0],positions.top.x[1])*assetScale,positions.top.y*assetScale,'assets','bubble');auxItem.body.velocity.set(((((positions.top.x[0]+positions.top.x[1])/2)*assetScale)-auxItem.x)%(bubblesMedia*assetScale),this.game.rnd.integerInRange(bubblesVelocity[0],bubblesVelocity[1])*assetScale);break;case 3:auxItem=this.container.create(positions.right.x*assetScale,this.game.rnd.integerInRange(positions.right.y[0],positions.right.y[1])*assetScale,'assets','bubble');auxItem.body.velocity.set(this.game.rnd.integerInRange(-bubblesVelocity[0],-bubblesVelocity[1])*assetScale,((((positions.right.y[0]+positions.right.y[1])/2)*assetScale)-auxItem.y)%(bubblesMedia*assetScale));break;case 4:auxItem=this.container.create(this.game.rnd.integerInRange(positions.bottom.x[0],positions.bottom.x[1])*assetScale,positions.bottom.y*assetScale,'assets','bubble');auxItem.body.velocity.set(((((positions.bottom.x[0]+positions.bottom.x[1])/2)*assetScale)-auxItem.x)%(bubblesMedia*assetScale),this.game.rnd.integerInRange(-bubblesVelocity[0],-bubblesVelocity[1])*assetScale);break;}
auxItem.anchor.set(0.5);auxItem.scale.set(0.8);auxItem.inputEnabled=true;auxItem.input.pixelPerfectClick=true;auxItem.input.pixelPerfectAlpha=0.5;auxItem.events.onInputDown.add(this.onItemClick,this);var letterCode;var letterID;var firstOperator;var secondOperator;if(this.gameplay.correctBubblesAmount/this.container.length<bubblesPercentage)
{letterCode=itemsToPop[correctID].letterMin;if(this.game.rnd.integerInRange(0,1)==1)
{letterCode=itemsToPop[correctID].letterMay;}
auxItem.id=correctID;this.gameplay.correctBubblesAmount++;}
else
{var sol=this.game.rnd.integerInRange(0,itemsToPop.length-1);letterCode=itemsToPop[sol].letterMin;if(this.game.rnd.integerInRange(0,1)==1)
{letterCode=itemsToPop[sol].letterMay;}
auxItem.id=sol;if(auxItem.id==correctID)
{this.gameplay.correctBubblesAmount++;}}
var idText=this.game.add.text(-20*assetScale,0,letterCode,style);idText.anchor.set(0.5);auxItem.addChild(idText);idText.scale.set(0.9);auxItem.checkWorldBounds=true;if(!auxItem.inCamera)
{auxItem.events.onEnterBounds.add(function(i)
{i.events.onOutOfBounds.add(function(a)
{if(a.id==correctID)
{this.gameplay.correctBubblesAmount--;}
this.container.removeChild(a);a.destroy();this.gameplay.GenerateBubbleEvent();},this)
this.gameplay.score.BringToTop();this.gameplay.timer.BringToTop();},this);}
else
{auxItem.events.onOutOfBounds.add(function(a)
{if(a.id==correctID)
{this.gameplay.correctBubblesAmount--;}
this.container.removeChild(a);a.destroy();this.gameplay.GenerateBubbleEvent();},this)
this.gameplay.score.BringToTop();this.gameplay.timer.BringToTop();}}
Bubbles.prototype.onItemClick=function(item)
{if(!this.gameplay.userControl)return;if(item.id==correctID)
{soundManager.playAudio(sfxAtlas,'bubbleBurst');this.gameplay.lulubody.play('blink');this.gameplay.score.IncreaseValue();this.gameplay.correctBubblesAmount--;this.gameplay.incorrectBubbles=0;var fontSize=100*assetScale;var style={font:fontSize+'px '+'Chelsea Market',fill:'#ff2b62',align:'center'};var pointText=this.game.add.text(item.x,item.y,"+1",style);pointText.anchor.set(0.5);pointText.alpha=0;this.game.add.tween(pointText.scale).from({x:0,y:0},500,"Linear",true,0);this.game.add.tween(pointText).to({alpha:1},500,"Linear",true,0,0,true).onComplete.add(function()
{pointText.destroy();},this);;this.container.removeChild(item);item.destroy();this.gameplay.GenerateBubbleEvent();}
else if(this.gameplay.incorrectBubbles>=1)
{soundManager.playAudio(sfxAtlas,'bubble');if(!this.gameplay.playingIncorrectPrompt)
{this.gameplay.playingIncorrectPrompt=true;this.gameplay.MultipleIncorrect();}
if(item.scale.x==0.8)
{this.game.add.tween(item.scale).to({x:0.9,y:0.9},200,"Linear",true,0,0,true);}}
else
{soundManager.playAudio(sfxAtlas,'bubble');this.gameplay.incorrectBubbles++;if(item.scale.x==0.8)
{this.game.add.tween(item.scale).to({x:0.9,y:0.9},200,"Linear",true,0,0,true);}}};Bubbles.prototype.SequencePlop=function(){for(var i=0;i<this.container.children.length;i++)
{this.game.add.tween(this.container.children[i]).to({},30*i,"Linear",true).onComplete.add(function(i)
{this.container.removeChild(i);i.destroy();},this);};this.game.time.events.add(Phaser.Timer.SECOND*2.3,this.RestartGame,this);};Bubbles.prototype.RestartGame=function()
{this.gameplay.NextLevel();};Bubbles.prototype.CreateParticleEffect=function()
{this.container=this.game.add.physicsGroup(Phaser.Physics.ARCADE);for(var i=0;i<60*assetScale;i++)
{auxFly=this.container.create(this.game.rnd.integerInRange(100,1300)*assetScale,this.game.rnd.integerInRange(0,800)*assetScale,'assets','bubble');auxFly.body.velocity.set(0,this.game.rnd.integerInRange(-500,-600)*assetScale);auxFly.anchor.set(0.5);auxFly.scale.set(Math.random()*(0.9-0.5)+0.5);};};Bubbles.prototype.IntroParticleEffect=function()
{var emitter=this.game.add.emitter(1010*assetScale,660*assetScale,50*assetScale);emitter.makeParticles('assets',["bubble1"]);emitter.minParticleSpeed.setTo(-70,-20);emitter.maxParticleSpeed.setTo(70,-10);emitter.setScale(0.2,0.7,0.2,0.7,1000);emitter.setSize(20*assetScale,20*assetScale);emitter.setAlpha(1,0.9,1000);emitter.gravity=-220;emitter.start(false,2500,30,50);};Bubbles.prototype.GameplayParticleEffect=function()
{var emitter=this.game.add.emitter(1010*assetScale,660*assetScale,50*assetScale);emitter.makeParticles('assets',["bubble1"]);emitter.minParticleSpeed.setTo(-70,-20);emitter.maxParticleSpeed.setTo(70,-10);emitter.setScale(0.2,0.7,0.2,0.7,1000);emitter.setSize(50*assetScale,20*assetScale);emitter.setAlpha(1,0.9,1000);emitter.gravity=-220;emitter.start(false,2500,400,0);};