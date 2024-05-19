function GamePlay(){Phaser.State.call(this);}
var proto=Object.create(Phaser.State);GamePlay.prototype=proto;GamePlay.prototype.create=function(){this.game.add.sprite(0,0,'assets','background1');this.boat=this.game.add.sprite(1010*assetScale,520*assetScale,'assets','boat');this.boat.anchor.set(0.5);this.boat.scale.set(0.8);this.laloLegLeft=this.game.add.sprite(180*assetScale,-50*assetScale,'assets','laloleg2');this.laloLegLeft.anchor.set(0.08,0.38);this.laloLegLeft.animateUp=true;this.boat.addChild(this.laloLegLeft);this.laloBody=this.game.add.sprite(70*assetScale,-180*assetScale,'assets','lalobody');this.laloBody.anchor.set(0.5);this.laloBody.animations.add('blink',['lalobody','lalobody1','lalobody2','lalobody1','lalobody'],12,false);this.boat.addChild(this.laloBody);this.laloLegRight=this.game.add.sprite(40*assetScale,140*assetScale,'assets','laloleg1');this.laloLegRight.anchor.set(0.08,0.38);this.laloLegRight.animateUp=true;this.laloBody.addChild(this.laloLegRight);this.laloWingRight=this.game.add.sprite(-60*assetScale,0*assetScale,'assets','lalowing');this.laloWingRight.anchor.set(0.08,0.38);this.laloBody.addChild(this.laloWingRight);this.lulubody=this.game.add.sprite(-85*assetScale,-65*assetScale,'assets','lulubody');this.lulubody.anchor.set(0.5);this.lulubody.animations.add('blink',['lulubody','lulubody1','lulubody2','lulubody1','lulubody'],12,false);this.boat.addChild(this.lulubody);this.luluWingRight=this.game.add.sprite(-95*assetScale,55*assetScale,'assets','luluwing1');this.luluWingRight.anchor.set(0.27,0.13);this.lulubody.addChild(this.luluWingRight);this.luluWingLeft=this.game.add.sprite(55*assetScale,45*assetScale,'assets','luluwing2');this.luluWingLeft.anchor.set(0.45,0.1);this.lulubody.addChild(this.luluWingLeft);this.lulupeak=this.game.add.sprite(-20*assetScale,40*assetScale,'assets','lulupeak');this.lulupeak.anchor.set(0.5);this.lulubody.addChild(this.lulupeak);this.fish=this.game.add.sprite(1050*assetScale,720*assetScale,'assets','fish');this.fish.anchor.set(0.5);this.game.time.events.loop(1,this.AnimateCharacters,this);if(playedStages==0)
{soundManager.playAudio(backgroundMusic,'backgroundMusic');new Intro(this.game,this);}
else
{this.game.onBlur.add(this.onGamePause,this);this.game.onFocus.add(this.onGameResume,this);this.userControl=false;this.playingIncorrectPrompt=false;this.ChooseItemToPop();this.score=new Score(this.game,this,1080*assetScale,100*assetScale);this.timer=new Timer(this.game,this,1100*assetScale,205*assetScale);this.bubbles=new Bubbles(this.game,this,0,0);this.correctBubblesAmount=0;this.incorrectBubbles=1;this.bubbles.GameplayParticleEffect();this.bubblesCreator=this.game.time.events.loop(Phaser.Timer.SECOND*0.3,this.GenerateBubbleEvent,this);this.StartPrompt();}
this.debuger=new SpriteAnchorDebug(this.game);};GamePlay.prototype.render=function()
{};GamePlay.prototype.IntroCallback=function()
{this.game.onBlur.add(this.onGamePause,this);this.game.onFocus.add(this.onGameResume,this);this.userControl=false;this.playingIncorrectPrompt=false;this.ChooseItemToPop();this.score=new Score(this.game,this,1080*assetScale,100*assetScale);this.timer=new Timer(this.game,this,1100*assetScale,205*assetScale);this.bubbles=new Bubbles(this.game,this,0,0);this.bubbles.GameplayParticleEffect();this.correctBubblesAmount=0;this.incorrectBubbles=1;this.bubblesCreator=this.game.time.events.loop(Phaser.Timer.SECOND*0.6,this.GenerateBubbleEvent,this);this.StartPrompt();};GamePlay.prototype.AnimateCharacters=function()
{var steps=0.02;if(this.boat.animateUp)
{if(this.boat.angle>-2)
{this.boat.angle-=steps;this.laloLegLeft.angle-=steps*5;this.laloLegRight.angle-=steps*6;this.laloWingRight.angle-=steps*1.2;this.luluWingLeft.angle-=steps*3;this.luluWingRight.angle+=steps*2;this.fish.angle+=steps*0.5;}
else
{this.boat.animateUp=false;this.laloBody.play('blink')}}
if(!this.boat.animateUp)
{if(this.boat.angle<2)
{this.boat.angle+=steps;this.laloLegLeft.angle+=steps*5;this.laloLegRight.angle+=steps*6;this.laloWingRight.angle+=steps*1.2;this.luluWingLeft.angle+=steps*3;this.luluWingRight.angle-=steps*2;this.fish.angle-=steps*0.5;}
else
{this.boat.animateUp=true;}}};GamePlay.prototype.ChooseItemToPop=function()
{if(itemsToPop.length==itemsPopped.length)
{itemsPopped=[];}
var alreadyPopped=true;while(alreadyPopped)
{correctID=this.game.rnd.integerInRange(0,itemsToPop.length-1);alreadyPopped=false;for(var i=0;i<itemsToPop.length;i++)
{if(itemsPopped[i]==correctID)
{alreadyPopped=true;break;}};}
itemsPopped[itemsPopped.length]=(correctID);};GamePlay.prototype.onGamePause=function()
{this.game.paused=true;};GamePlay.prototype.onGameResume=function()
{this.game.paused=false;};GamePlay.prototype.StartPrompt=function()
{soundManager.addOnStopCallback(voiceAtlas,this.PlayLetterAndStartGame,this);soundManager.playAudio(voiceAtlas,'prompt1');};GamePlay.prototype.PlayLetterAndStartGame=function()
{soundManager.removeOnStopCallback(voiceAtlas,this.PlayLetterAndStartGame,this);soundManager.addOnStopCallback(voiceAtlas,this.StartGame,this);soundManager.playAudio(voiceAtlas,sounds.voiceAudio[itemsToPop[correctID].audio].name);};GamePlay.prototype.ShowResultGlobe=function()
{var fontSize=110*assetScale;var style={font:fontSize+'px '+'Chelsea Market',fill:'#34b9a1',align:'center'};var resultText=this.game.add.text(-120*assetScale,0,correctID,style);resultText.anchor.set(0.5);this.globe=this.game.add.sprite(-110*assetScale,40*assetScale,'assets','globe');this.globe.anchor.set(0.93,0.54);this.game.add.tween(this.globe.scale).from({x:0,y:0},700,"Linear",true);this.globe.addChild(resultText);this.lulubody.addChild(this.globe);};GamePlay.prototype.HideResultGlobe=function()
{this.game.add.tween(this.globe.scale).to({x:0,y:0},700,"Linear",true);};GamePlay.prototype.StartGame=function()
{soundManager.removeOnStopCallback(voiceAtlas,this.StartGame,this);this.userControl=true;};GamePlay.prototype.update=function()
{if(this.userControl)
{this.timer.DecreaseTimer();}};GamePlay.prototype.TimerCallback=function()
{if(this.userControl)
{soundManager.removeAllOnStop(voiceAtlas);soundManager.stop(voiceAtlas);this.game.time.events.remove(this.bubblesCreator);this.userControl=false;this.bubbles.SequencePlop();}};GamePlay.prototype.NextLevel=function()
{if(playedStages<3)
{playedStages++;this.game.state.start("GamePlay");}
else
{this.score.MoveToCenter();this.timer.Hide();}};GamePlay.prototype.GenerateBubbleEvent=function()
{if(this.userControl&&this.bubbles.container.length<maxAmountOfBubbles)
{this.bubbles.GenerateItem();}};GamePlay.prototype.MultipleIncorrect=function()
{soundManager.addOnStopCallback(voiceAtlas,this.playCorrectLetter,this);soundManager.playAudio(voiceAtlas,'prompt2');};GamePlay.prototype.playCorrectLetter=function()
{soundManager.removeOnStopCallback(voiceAtlas,this.playCorrectLetter,this);soundManager.addOnStopCallback(voiceAtlas,this.OnStopPlayingLetter,this);soundManager.playAudio(voiceAtlas,sounds.voiceAudio[itemsToPop[correctID].audio].name);};GamePlay.prototype.OnStopPlayingLetter=function()
{soundManager.removeOnStopCallback(voiceAtlas,this.OnStopPlayingLetter,this);this.playingIncorrectPrompt=false;this.incorrectBubbles=0;};GamePlay.prototype.endGame=function(){new EndEmitter(this.game,0,0,1000);soundManager.playAudio(voiceAtlas,'promptFinal');this.score.BringToTop();new RestartBtn(this.game);};