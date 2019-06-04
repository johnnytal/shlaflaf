document.addEventListener("deviceready", start, false);
//window.onload = start;

function start(){
    WIDTH = 640; 
    HEIGHT = 480;
    
    w = window.innerWidth * window.devicePixelRatio;
    h = window.innerHeight * window.devicePixelRatio;

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, '');

    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("Avatar", avatar);
    game.state.add("Game", game_main);
    game.state.add("GameOver", game_over);
    
    game.state.start("Boot");  
};

var boot = function(game){};

boot.prototype = {
    preload: function(){},
    
    create: function(){     
        game.stage.backgroundColor = '#f1f1f1';

        if (this.game.device.desktop){
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 
            this.scale.maxWidth = w; 
            this.scale.maxHeight = h; 
            
            this.game.scale.pageAlignHorizontally = true;
        } 
        
        else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxWidth = w;
            this.scale.maxHeight = h;
            
            this.scale.forceOrientation(false, true);
        }
        
        game.state.start('Preloader');
    }
};