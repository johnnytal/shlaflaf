var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        // create progress % text
        font = 'Luckiest Guy';
         
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '',{
             font: '25px', fill: 'white', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "", {
            font: '18px', fill: 'lightgrey', align: 'center'
        });

        game.load.image('panel', 'assets/shlaflaf/images/panel.png');
        game.load.image('replay', 'assets/shlaflaf/images/replay.png');
        game.load.image('inst', 'assets/shlaflaf/images/inst.png');
        game.load.image('arrow', 'assets/shlaflaf/images/arrow.png');
        game.load.image('arrow_l', 'assets/shlaflaf/images/arrow_l.png');
        game.load.image('bottle', 'assets/shlaflaf/images/bottle.png');
        game.load.spritesheet('exit_btn', 'assets/shlaflaf/images/exit_btn.png', 40, 42);

        game.load.image('button', 'assets/shlaflaf/images/button.png');
        game.load.image('button2', 'assets/shlaflaf/images/button2.png');

        game.load.image('cloud', 'assets/shlaflaf/images/cloud.png');
        
        game.load.image('bg', 'assets/shlaflaf/images/bg.jpg');
       
        game.load.image('ilyich', 'assets/shlaflaf/images/bibi.png');

        game.load.spritesheet('avatars', 'assets/shlaflaf/images/avatars.png',250/2, 880/7);
 
        game.load.audio('bark1', 'assets/shlaflaf/audio/bark1.mp3');
        game.load.audio('bark2', 'assets/shlaflaf/audio/bark2.mp3');
        game.load.audio('bark3', 'assets/shlaflaf/audio/bark3.mp3');
        game.load.audio('bark4', 'assets/shlaflaf/audio/bark4.mp3');
        
        game.load.audio('bottle', 'assets/shlaflaf/audio/bottle.mp3');
        game.load.audio('click', 'assets/shlaflaf/audio/click.mp3');
        game.load.audio('fail', 'assets/shlaflaf/audio/fail.mp3');
        game.load.audio('gameOver', 'assets/shlaflaf/audio/gameOver.mp3');
        game.load.audio('music', 'assets/shlaflaf/audio/music.mp3');
        game.load.audio('success', 'assets/shlaflaf/audio/success.mp3');
        game.load.audio('waiting', 'assets/shlaflaf/audio/waiting.mp3');
    },
    
    create: function(){
        avatars = [];
        
        var bg = this.add.image(0, 0, 'bg');

        logo = this.add.text(315,  35, "? א י ך   ל ש ח ק   ק ז ב י ב י ", {
            font: '36px', fill: 'darkred', align: 'center', stroke: "white", strokeThickness: 3
        });
        logo.anchor.set(0.5, 0.5);
        
        game.add.tween(logo).from( { alpha: 0}, 2800, Phaser.Easing.Sinusoidal.InOut, true);
        game.add.tween(logo.scale).from( { x: 1.8, y: 1.8}, 2600, Phaser.Easing.Sinusoidal.InOut, true);
        
        var ilyich = this.add.image(WIDTH - 140, 290, 'ilyich');
        ilyich.scale.set(.7, .7);
        ilyich.x = WIDTH / 2 - ilyich.width / 2;
        
        for (n = 0; n<2; n++){
            cloud = this.add.image(80, 125 + (75*n), 'cloud');
            cloud.scale.set(.4, .2);
        }
        
        this.add.text(335,  80, ":השמאלן אומר", {
            font: '27px', fill: 'darkgreen', align: 'center'
        });
        
        this.add.text(115,  80, ":ביבי צריך להגיד", {
            font: '27px', fill: 'darkgreen', align: 'center'
        });

        textA2 = this.add.text(130,  140, "!שם של שמאלן", {
            font: '25px', fill: '#cc0000', align: 'center'
        });
        
        textB1 = this.add.text(155,  215, "!שמאלן", {
            font: '25px', fill: 'purple', align: 'center'
        });

        textC2 = this.add.text(365,  140, "!שמאלן", {
            font: '25px', fill: 'purple', align: 'center',
        });
        
        textD1 = this.add.text(340,  215, "!שם של שמאלן", {
            font: '25px', fill: '#cc0000', align: 'center'
        });

        game.add.tween(textA2).from( { x: -500  }, 350, Phaser.Easing.Sinusoidal.InOut, true);  
        game.add.tween(textB1).from( { x: -500 }, 750, Phaser.Easing.Sinusoidal.InOut, true); 
        game.add.tween(textC2).from( { x: WIDTH + 330 }, 550, Phaser.Easing.Sinusoidal.InOut, true); 
        
        game.add.tween(textD1).from( { x: WIDTH + 330 }, 950, Phaser.Easing.Sinusoidal.InOut, true); 

        tapText = this.add.text(320,  435, "הקש כדי להמשיך" , {font: '23px', fill: 'white', align: 'center'});
   		tapText.x = WIDTH / 2 - tapText.width / 2;
    }, 
    update: function(){           
        if(game.input.activePointer.isDown){
            this.game.state.start("Avatar");  
        }
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text ="";
};
