var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        // create progress % text
        font = 'Luckiest Guy';
         
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '',{
             font: '25px ' + font, fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "", {
            font: '18px ' + font, fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });

        // load assets

        game.load.image('panel', 'assets/shlaflaf/images/panel.png');
        game.load.image('replay', 'assets/shlaflaf/images/replay.png');
        game.load.image('inst', 'assets/shlaflaf/images/inst.png');
        game.load.image('arrow', 'assets/shlaflaf/images/arrow.png');
        game.load.image('arrow_l', 'assets/shlaflaf/images/arrow_l.png');
        game.load.image('bottle', 'assets/shlaflaf/images/bottle.png');
        game.load.spritesheet('exit_btn', 'assets/shlaflaf/images/exit_btn.png', 40, 42);
        game.load.spritesheet('leadersBtn', 'assets/shlaflaf/images/leadersBtn.png', 193/3, 66);
        
        game.load.image('button', 'assets/shlaflaf/images/button.png');
        game.load.image('button2', 'assets/shlaflaf/images/button2.png');
        game.load.image('button3', 'assets/shlaflaf/images/button3.png');
        game.load.image('button4', 'assets/shlaflaf/images/button4.png');
        
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
        bg.alpha = 0.6;
        
        logo = this.add.text(315,  35, "? א י ך  ל ש ח ק  ק א ז א ב י ב י ", {
            font: '32px ' + font, fill: 'darkred', align: 'center', stroke: "white", strokeThickness: 3
        });
        logo.anchor.set(0.5, 0.5);
        
        game.add.tween(logo).from( { alpha: 0}, 2800, Phaser.Easing.Sinusoidal.InOut, true);
        game.add.tween(logo.scale).from( { x: 1.8, y: 1.8}, 2600, Phaser.Easing.Sinusoidal.InOut, true);
        
        var ilyich = this.add.image(WIDTH - 140, 185, 'ilyich');
        ilyich.scale.set(.7, .7);
        
        for (n = 0; n<4; n++){
            cloud = this.add.image(80, 120 + (75*n), 'cloud');
            cloud.scale.set(0.40, 0.20);
            
            arrow = this.add.image(230, 140 + (75*n), 'arrow');
        }
        
        this.add.text(70,  80, ":השמאלן אומר", {
            font: '25px ' + font, fill: 'darkgreen', align: 'center'
        });
        
        this.add.text(320,  80, ":ביבי צריך להגיד", {
            font: '25px ' + font, fill: 'darkgreen', align: 'center'
        });
        
        textA1 = this.add.text(130,  135, "!כתב אישום", {
            font: '25px ' + font, fill: 'purple', align: 'center'
        });
        
        textA2 = this.add.text(130,  210, "!שם של שמאלן", {
            font: '25px ' + font, fill: '#cc0000', align: 'center'
        });
        
        textB1 = this.add.text(130,  285, "!שמאל", {
            font: '25px ' + font, fill: 'purple', align: 'center'
        });
        
        textB2 = this.add.text(130,  360, "!כתב אישום", {
            font: '25px ' + font, fill: '#cc0000', align: 'center'
        });
        
        textC1 = this.add.text(340,  135, "!מסע ציד, רדיפה פוליטית וכדומה", {
            font: '25px ' + font, fill: '#885ead', align: 'center',
        });
        
        textC2 = this.add.text(340,  210, "!שמאל", {
            font: '25px ' + font, fill: '#cc5500', align: 'center',
        });
        
        textD1 = this.add.text(340,  285, "!שם של שמאלן", {
            font: '25px ' + font, fill: '#885ead', align: 'center'
        });
        
        textD2 = this.add.text(340,  360, "!מסע ציד, רדיפה פוליטית וכדומה", {
            font: '25px ' + font, fill: '#cc5500', align: 'center'
        });
        
        game.add.tween(textA1).from( { x: -500 }, 150, Phaser.Easing.Sinusoidal.InOut, true); 
        game.add.tween(textA2).from( { x: -500  }, 350, Phaser.Easing.Sinusoidal.InOut, true); 
        
        game.add.tween(textB1).from( { x: -500 }, 750, Phaser.Easing.Sinusoidal.InOut, true); 
        game.add.tween(textB2).from( { x: -500  }, 1150, Phaser.Easing.Sinusoidal.InOut, true); 
        
        game.add.tween(textC1).from( { x: WIDTH + 330 }, 350, Phaser.Easing.Sinusoidal.InOut, true); 
        game.add.tween(textC2).from( { x: WIDTH + 330 }, 550, Phaser.Easing.Sinusoidal.InOut, true); 
        
        game.add.tween(textD1).from( { x: WIDTH + 330 }, 950, Phaser.Easing.Sinusoidal.InOut, true); 
        game.add.tween(textD2).from( { x: WIDTH + 330}, 1350, Phaser.Easing.Sinusoidal.InOut, true); 
        
        this.add.text(65,  430, "S i m p l e   e n o u g h ?     T a p   t o   c o n t i n u e ! " , {
            font: '23px ' + font, fill: 'darkblue', align: 'center',stroke:'#fff', strokeThickness: 1
        });
    }, 
    update: function(){           
        if(game.input.activePointer.isDown){
            this.game.state.start("Avatar");  
        }
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text ="";
   // console.log(progress, cacheKey, success);
};
