// Stub for Y8 branding logo (removed). Keeps API compatibility without rendering Y8/IDNET branding.
(function(){
    if (typeof createjs === "undefined" || !createjs.Container) return;
    function Y8logo(posX, posY, sprite, str){
        createjs.Container.call(this);
        this.x = posX || 0;
        this.y = posY || 0;
    }
    Y8logo.prototype = Object.create(createjs.Container.prototype);
    Y8logo.prototype.constructor = Y8logo;
    Y8logo.prototype.showAnim = function(){};
    Y8logo.prototype.removeAnim = function(){};
    Y8logo.prototype.setX = function(x){ this.x = x; };
    Y8logo.prototype.setY = function(y){ this.y = y; };
    Y8logo.prototype.removeListeners = function(){};
    Y8logo.prototype.unload = function(){ this.removeAllChildren && this.removeAllChildren(); this.destroy && this.destroy(); };
    Y8logo.prototype.destroy = function(){};
    Y8logo.prototype.setVisible = function(){};
    Y8logo.prototype.setAlpha = function(){};
    Y8logo.prototype.showAnim = function(){};
    Y8logo.prototype.removeAnim = function(){};
    Y8logo.prototype.setX = function(x){ this.x = x; };
    Y8logo.prototype.setY = function(y){ this.y = y; };
    Y8logo.prototype.removeListeners = function(){};
    window.Y8logo = Y8logo;
})();
