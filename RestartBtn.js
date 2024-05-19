function RestartBtn(game){this.game=game;this.userControl=true;this.restBtn=this.game.add.button(this.game.world.centerX+40*assetScale,this.game.world.centerY+150*assetScale,'assets',this.onRestartBtn,this,'return2','return','return');this.restBtn.anchor.set(0.5);this.game.add.tween(this.restBtn).from({alpha:0},1500,"Linear",true);}
RestartBtn.prototype.onRestartBtn=function()
{if(!this.userControl){return;}
this.userControl=false;soundManager.addOnStopCallback(sfxAtlas,this.startGame,this);soundManager.playAudio(sfxAtlas,'btnNavigation');};RestartBtn.prototype.startGame=function()
{soundManager.removeOnStopCallback(sfxAtlas,this.startGame,this);itemsPopped=[];currentScore=0;playedStages=0;this.game.state.start("GamePlay");};