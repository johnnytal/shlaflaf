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

        game.load.image('panel', 'images/panel.png');
        game.load.image('replay', 'images/replay.png');
        game.load.image('inst', 'images/inst.png');
        game.load.image('arrow', 'images/arrow.png');
        game.load.image('arrow_l', 'images/arrow_l.png');
        game.load.image('bottle', 'images/bottle.png');
        game.load.spritesheet('exit_btn', 'images/exit_btn.png', 40, 42);
        game.load.spritesheet('leadersBtn', 'images/leadersBtn.png', 92, 95);
        
        game.load.image('button', 'images/button.png');
        game.load.image('button2', 'images/button2.png');
        game.load.image('button3', 'images/button3.png');
        game.load.image('button4', 'images/button4.png');
        
        game.load.image('cloud', 'images/cloud.png');
        
        game.load.image('bg', 'images/bg.jpg');
       
        game.load.image('ilyich', 'images/ilyich.png');

        game.load.spritesheet('avatars', 'images/avatars.png',250/2, 880/7);
        

        game.load.audio('bark1', 'audio/bark1.mp3');
        game.load.audio('bark2', 'audio/bark2.mp3');
        game.load.audio('bark3', 'audio/bark3.mp3');
        game.load.audio('bark4', 'audio/bark4.mp3');
        
        game.load.audio('bottle', 'audio/bottle.mp3');
        game.load.audio('click', 'audio/click.mp3');
        game.load.audio('fail', 'audio/fail.mp3');
        game.load.audio('gameOver', 'audio/gameOver.mp3');
        game.load.audio('music', 'audio/music.mp3');
        game.load.audio('success', 'audio/success.mp3');
        game.load.audio('waiting', 'audio/waiting.mp3');

    },
    
    create: function(){

        avatars = [];
        
        var bg = this.add.image(0, 0, 'bg');
        bg.alpha = 0.6;
        
        this.add.text(this.game.world.centerX - 130,  15, "H o w    t o    p l a y  ?", {
            font: '28px ' + font, fill: 'blue', align: 'center'
        });
        
        var ilyich = this.add.image(WIDTH - 140, 185, 'ilyich');
        ilyich.tint = '0xffddff';
        
        for (n = 0; n<4; n++){
            cloud = this.add.image(80, 120 + (75*n), 'cloud');
            cloud.scale.set(0.40, 0.20);
            
            arrow = this.add.image(230, 140 + (75*n), 'arrow');
        }
        
        this.add.text(80,  70, "i L y i c h   s a y s :", {
            font: '25px ' + font, fill: 'darkgreen', align: 'center'
        });
        
        this.add.text(330,  70, "Y o u   h a v e   t o   s a y :", {
            font: '25px ' + font, fill: 'darkgreen', align: 'center'
        });
        
        this.add.text(130,  135, "SHLAFLAF!", {
            font: '23px ' + font, fill: 'purple', align: 'center',
            stroke:'#fff', strokeThickness: 1
        });
        
        this.add.text(130,  210, "YOUR NAME!", {
            font: '23px ' + font, fill: '#cc0000', align: 'center',
            stroke:'#fff', strokeThickness: 1
        });
        
        this.add.text(130,  285, "KAZABUBU!", {
            font: '23px ' + font, fill: 'purple', align: 'center',
            stroke:'#fff', strokeThickness: 1
        });
        
        this.add.text(130,  360, "ILYICH!", {
            font: '23px ' + font, fill: '#cc0000', align: 'center',
            stroke:'#fff', strokeThickness: 1
        });
        
        this.add.text(340,  135, "YOUR NAME", {
            font: '23px ' + font, fill: '#885ead', align: 'center',
            stroke:'#fff', strokeThickness: 1
        });
        
        this.add.text(340,  210, "SHLAFLAF", {
            font: '23px ' + font, fill: '#cc5500', align: 'center',
            stroke:'#fff', strokeThickness: 1
        });
        
        this.add.text(340,  285, "ILYICH", {
            font: '23px ' + font, fill: '#885ead', align: 'center',
            stroke:'#fff', strokeThickness: 1
        });
        
        this.add.text(340,  360, "KAZABUBU", {
            font: '23px ' + font, fill: '#cc5500', align: 'center',
            stroke:'#fff', strokeThickness: 1
        });
        
        this.add.text(78,  430, "S i m p l e   e n o u g h ?     T a p   t o   c o n t i n u e ! " , {
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
