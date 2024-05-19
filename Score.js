function Score(game,gameplay,x,y){this.game=game;this.gameplay=gameplay;this.scoreTab=this.game.add.image(x,y,'assets','score');this.scoreTab.anchor.set(0.5);this.scoreTab.alpha=1;var fontSize=60*assetScale;var style={font:fontSize+'px '+'Chelsea Market',fill:'white',align:'center'};this.scoreText=this.game.add.text(80*assetScale,10*assetScale,currentScore,style);this.scoreText.anchor.set(0.5);this.scoreTab.addChild(this.scoreText);}
Score.prototype.IncreaseValue=function()
{currentScore++;this.scoreText.text=currentScore;};Score.prototype.AnimateAlpha=function()
{this.game.add.tween(this.scoreTab).from({alpha:0},1000,Phaser.Easing.Linear.None,true,1000,0,false);};Score.prototype.BringToTop=function(){if(this.scoreTab!=null){this.game.world.bringToTop(this.scoreTab);}};Score.prototype.MoveToCenter=function()
{this.game.add.tween(this.scoreTab).to({x:this.game.world.centerX,y:this.game.world.centerY},1000,Phaser.Easing.Bounce.Out,true).onComplete.add(function()
{this.gameplay.endGame();},this);};