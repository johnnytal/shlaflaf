var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        // create progress % text
        font = 'Candal';
         
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '',{
             font: '25px ' + font, fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "", {
            font: '18px ' + font, fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });

        // load assets

        game.load.image('replay', 'images/menu.png');
        game.load.image('panel', 'images/panel.png');
        
        game.load.image('button', 'images/button.png');
        game.load.image('button2', 'images/button2.png');
        game.load.image('button3', 'images/button3.png');
        game.load.image('button4', 'images/button4.png');
        
        game.load.image('cloud', 'images/cloud.png');
        
        game.load.image('bg', 'images/bg.jpg');
       
        game.load.image('ilyich', 'images/ilyich.png');

        game.load.spritesheet('avatars', 'images/avatars.png',250/2, 880/7);
        game.load.spritesheet('playBtn', 'images/playBtn.png',180, 190);

       // game.load.audio('', 'audio/');

    },
    
    create: function(){

        avatars = [];
        
        var bg = this.add.image(0, 0, 'bg');
        bg.alpha = 0.6;
        
        this.add.text(this.game.world.centerX - 130,  30, "How to play Shlaflaf :", {
            font: '23px ' + font, fill: 'blue', fontWeight: 'bold', align: 'center'
        });
        
        this.add.text(this.game.world.centerX - 260,  100, 'iLyich says "Shlaflaf" -- You say your name', {
            font: '22px ' + font, fill: 'purple', fontWeight: 'normal', align: 'center'
        });
        
        this.add.text(this.game.world.centerX - 260, 150, 'iLyich says your name -- You say "Shlaflaf"', {
            font: '22px ' + font, fill: 'darkgreen', fontWeight: 'normal', align: 'center'
        });
        
        this.add.text(this.game.world.centerX - 260, 200, 'iLyich says "Kazabubu" -- You say "iLyich"', {
            font: '22px ' + font, fill: 'purple', fontWeight: 'normal', align: 'center'
        });
        
        this.add.text(this.game.world.centerX - 260, 250, 'iLyich says "iLyich" -- You say "Kazabubu"', {
            font: '22px ' + font, fill: 'darkgreen', fontWeight: 'normal', align: 'center'
        });

        this.add.text(this.game.world.centerX - 210, 315, ' Simple enough? Good! \n Tap anywhere to continue!', {
            font: '29px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'center'
        });
    }, 
    update: function(){           
        if(game.input.activePointer.isDown){
            this.game.state.start("Avatar");  
        }
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
   // console.log(progress, cacheKey, success);
};
