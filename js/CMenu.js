function CMenu(){
    var _oBg;
    var _oButPlay;
    var _oFade;
    var _oAudioToggle;
    var _oCreditsBut;
    var _oButFullscreen;
    var _oLogo;
    
    var _aLetters;
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _pStartPosCredits;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    //Idnet Variables
    var _loginText;
    var _textGroup;
    
    var _oLeaderboardBtn;
    var _pLeaderboardBtn;
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CGfxButton((CANVAS_WIDTH/2),CANVAS_HEIGHT -300,oSprite,s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
     
        var oSprite = s_oSpriteLibrary.getSprite('but_credits');
        _pStartPosCredits = {x: (oSprite.width/2) + 10, y: (oSprite.height/2) + 10};            
        _oCreditsBut = new CGfxButton(_pStartPosCredits.x,_pStartPosCredits.y,oSprite, s_oStage);
        _oCreditsBut.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);
     
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.width/4)- 10, y: (oSprite.height/2) + 10};            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = {x:_pStartPosCredits.x + oSprite.width/2 + 10,y:(oSprite.height/2) + 10};
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreenRelease,this);
        }

        s_oMain.createY8Logo("g_menulogo", 320, CANVAS_HEIGHT-60)
        
        var oSprite = s_oSpriteLibrary.getSprite('but_leaderboard');
        _pLeaderboardBtn = {x: CANVAS_WIDTH - (oSprite.width/4 + oSprite.width) - 40, y: (oSprite.height/2) + 10};            
       _oLeaderboardBtn = new CGfxButton(_pLeaderboardBtn.x,_pLeaderboardBtn.y,oSprite, s_oStage);
       _oLeaderboardBtn.addEventListener(ON_MOUSE_UP, this._showLeaderboard, this);
       
        var oSprite = s_oSpriteLibrary.getSprite('logo');
        _oLogo = new CLightIndicator(oSprite, CANVAS_WIDTH_HALF, CANVAS_HEIGHT_HALF - 100, s_oStage);

        var pOffset = {x: -170, y: -600};
        _aLetters = new Array();
        for(var i=0; i<7; i++){
            var oSprite = s_oSpriteLibrary.getSprite('letter_'+i);
            var oLetter = new CLightIndicator(oSprite, LETTERS_POSITION[i].x + pOffset.x, LETTERS_POSITION[i].y + pOffset.y, s_oStage);
            _aLetters.push(oLetter);
        }

        this.animLogo();

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});  
        
        _loginText = new createjs.Text("","bold 30px "+PRIMARY_FONT, "#ffffff");
        _loginText.shadow = new createjs.Shadow("#000000", 0.5, 0.5, 0.5);
        _loginText.x =  CANVAS_WIDTH/2;
        _loginText.y =  CANVAS_HEIGHT/2-420;
        _loginText.textBaseline = "alphabetic";
        _loginText.lineWidth = 500;
        _loginText.text = "Welcome Guest";
        _loginText.textAlign = 'right';
        _textGroup = new createjs.Container();
        _textGroup.alpha = 1;
        _textGroup.visible=true;        
        _textGroup.addChild(_loginText);
        s_oStage.addChild(_textGroup);
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
        
        if(!s_oLocalStorage.isUsed()){
            new CMsgBox(TEXT_IOS_PRIVATE);
        }
        
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        _oFade.visible = false;
        
        _oCreditsBut.unload();
        
        _oLogo.unload();
        for(var i=0; i<_aLetters.length; i++){
            _aLetters[i].unload();
        }
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
                _oButFullscreen.unload();
        }
        
        s_oStage.removeAllChildren();
        _oBg = null;
        s_oMenu = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oCreditsBut.setPosition(_pStartPosCredits.x + iNewX,iNewY + _pStartPosCredits.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        if (_fRequestFullScreen && screenfull.enabled){
                _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX, _pStartPosFullscreen.y + iNewY);
        }
        
        _oLeaderboardBtn.setPosition(_pLeaderboardBtn.x - s_iOffsetX, _pLeaderboardBtn.y + s_iOffsetY);
        s_oMain.logoReposition(s_iOffsetX+80, (CANVAS_HEIGHT - 50) - s_iOffsetY)
        _loginText.x =  (CANVAS_WIDTH - 10) - iNewX;
        _loginText.y =  (CANVAS_HEIGHT -20) - s_iOffsetY;
    };
    
    this.getUserName = function () {
        if(s_isLogin===true){
            _loginText.text = 'Welcome '+s_userName;
        }else{
            _loginText.text = "Welcome Guest";
        }
    };
    
    this._showLeaderboard = function()
    {
        ID.GameAPI.Leaderboards.list({table:'Leaderboard', mode:'newest'})
    }
    
    this.animLogo = function(){
        _oLogo.slowHighlight(2000, 0, function(){});
        
        for(var i=0; i<_aLetters.length; i++){
            _aLetters[i].slowHighlight(2000, 1500, s_oMenu.animLogo);
        }
        
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onCreditsBut = function(){
        new CCreditsPanel();
    };
    
    this.resetFullscreenBut = function(){
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };
        
    this._onFullscreenRelease = function(){
	if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    this._onButPlayRelease = function(){
        
        this.unload();

        $(s_oMain).trigger("start_session");
        s_oMain.gotoGame();
        
        try{
            if(isFirstAdPlayed === false)
            {
                isFirstAdPlayed = true;
                playAds()
            }
        }
        catch(e)
        {
            console.log("playAds " + e)
            showMessage()
        }

    };
	
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;