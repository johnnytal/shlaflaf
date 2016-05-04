var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        // create progress % text
        font = 'Exo';
         
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px ' + font, fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "Loading...", {
            font: '18px ' + font, fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });

        // load assets

        game.load.image('replay', 'images/replay.png');
        game.load.image('panel', 'images/panel.png');
        game.load.image('button', 'images/button.png');
        game.load.image('bg', 'images/bg.jpg');
       
        game.load.image('ilyich', 'images/ilyich.png');

        game.load.spritesheet('avatars', 'images/avatars.png',250/2, 880/7);
        game.load.spritesheet('playBtn', 'images/playBtn.png',180, 190);

       // game.load.audio('', 'audio/');

    },
    
    create: function(){
        avatars = [];
        
        var bg = this.add.image(0, 0, 'bg');
        
        this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "Instructions:", {
            font: '22px ' + font, fill: 'blue', fontWeight: 'normal', align: 'center'
        }); 
        
        this.add.text(this.game.world.centerX - 37, 150, "Choose Avater:", {
            font: '22px ' + font, fill: 'red', fontWeight: 'normal', align: 'center'
        });   
        
        for (a=0; a<7; a++){
            avatars[a] = this.add.sprite(175 + (a*50), 200, 'avatars');
            avatars[a].scale.set(0.3, 0.3);
            avatars[a].frame = a;
            
            avatars[a].inputEnabled = true;
            avatars[a].input.useHandCursor = true;
            avatars[a].events.onInputDown.add(avatarChosen, this);
        }
        
        this.add.text(this.game.world.centerX - 37, 150, "Choose Avater:", {
            font: '22px ' + font, fill: 'red', fontWeight: 'normal', align: 'center'
        });   
    }, 
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
   // console.log(progress, cacheKey, success);
};
