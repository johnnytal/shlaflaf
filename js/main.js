var game_main = function(game){
    var buttons, options, life, option_to_create;
    score = 0;
    lives = 3;
    lifeSprite = [];
    time_factor = 0;
    time_left = 300;
    init_time = time_left;
};

game_main.prototype = {
    create: function(){
        var bg = this.add.image(0, 0, 'bg');
        bg.alpha = 0.7;
        
        lives = 3;
        
        var ilyich = this.add.image(WIDTH - 135, 190, 'ilyich');
        var avatar = this.add.sprite(15, 200, 'avatars');
        avatar.frame = frame;
        
        for (l=0; l<lives; l++){
            lifeSprite[l] = this.add.sprite(470 + (l*50), 30, 'avatars');
            lifeSprite[l].frame = frame;
            lifeSprite[l].scale.set(0.3, 0.3);
        }

        var btn_shlaflaf = this.add.sprite(170, 200, 'button');
        var btn_kazabubu = this.add.sprite(330, 200, 'button');
        var btn_ilyich = this.add.sprite(330, 275, 'button');
        var btn_name = this.add.sprite(170, 275, 'button');
        
        buttons = [btn_shlaflaf, btn_kazabubu, btn_ilyich, btn_name];
        options = ['Shlaflaf', 'Kazabubu', 'iLyich', name];
        
        for (b=0; b<buttons.length; b++){
            buttons[b].inputEnabled = true;
            buttons[b].input.useHandCursor = true;
            buttons[b].events.onInputDown.add(userInput, this);
            buttons[b].events.onInputUp.add(userInputOut, this);
        }
        
        btn_shlaflafLabel = this.add.text(240, 230, 'Shlaflaf', {
            font: '24px ' + font, fill: 'darkred', fontWeight: 'normal', align: 'center'
        }); btn_shlaflafLabel.anchor.set(0.5, 0.5);
        
        btn_kazabubuLabel = this.add.text(400, 230, 'Kazabubu', {
            font: '24px ' + font, fill: 'darkred', fontWeight: 'normal', align: 'center'
        }); btn_kazabubuLabel.anchor.set(0.5, 0.5);
        
        btn_ilyichLabel = this.add.text(400, 305, 'iLyich', {
            font: '24px ' + font, fill: 'darkred', fontWeight: 'normal', align: 'center'
        }); btn_ilyichLabel.anchor.set(0.5, 0.5);
       
        btn_nameLabel = this.add.text(240, 305, name, {
            font: '24px ' + font, fill: 'darkred', fontWeight: 'normal', align: 'center'
        }); btn_nameLabel.anchor.set(0.5, 0.5);
        
        optionLabel = this.add.text(330, 100, 'Ready? Set...', {
            font: '28px ' + font, fill: 'darkblue', fontWeight: 'bold', align: 'center'
        }); optionLabel.anchor.set(0.5, 0.5);
        
        timeLabel = this.add.text(75, 100, time_left, {
            font: '22px ' + font, fill: 'red', fontWeight: 'normal', align: 'center'
        }); timeLabel.anchor.set(0.5, 0.5);
        
        scoreLabel = this.add.text(30, 25, 'Score: ' + score, {
            font: '24px ' + font, fill: 'darkgreen', fontWeight: 'normal', align: 'center'
        });

        createOption(); 
        
        modal = new gameModal(game);
    },

    update: function(){

    }
};

function userInput(btn){
    btn.tint = 0x00ffff;
    optionChosen = btn.x + btn.y;
    number = parseInt(optionChosen + option_to_create);
    
    userPressed(number);
}

function userInputOut(btn){
    btn.tint = 0xffffff;
}

function userPressed(number){
    clearInterval(timer);
    
    if (number == 373 || number == 532 || number == 606 || number == 445){
        timeBonus = Math.round((time_left / init_time) * 1000);
        rounded = Math.round(timeBonus/10) * 10;
        
        score += rounded;
        scoreLabel.text = 'Score: ' + score;
        
        optionLabel.text = rounded;
        optionLabel.fill = 'green';
        game.add.tween(optionLabel).to( { y: -10 }, 500, Phaser.Easing.Linear.None, true);
    }
    else{
       takeLife();
       
       optionLabel.text = 'FAIL!';
       optionLabel.fill = 'red';
       game.add.tween(optionLabel).to( { y: -10 }, 500, Phaser.Easing.Linear.None, true); 
    }    

    time_factor += 5;
    
    time_left = 300 - time_factor;
    init_time = time_left;

    rndTime = game.rnd.integerInRange(500, 3000);
    
    setTimeout(function(){
        if (lives > 0){
            createOption();
        }
    }, rndTime);      
}

function createOption(){
    optionLabel.y = 100;
    optionLabel.fill = 'darkblue';
    
    option_to_create = game.rnd.integerInRange(0, 3);
    optionLabel.text = options[option_to_create];
    
    timer = setInterval(function(){
       if (time_left > 0){
           time_left--;
           timeLabel.text = time_left; 
       }
       
       else{
          userPressed(0); 
       }
    }, 10);
}

function takeLife(){
    lives--;
    
    if (lives > -1){
        lifeSprite[lives].kill();
    }

    if (lives == 0){
        game.state.start('GameOver', false, false, score);
    }
}


function avatarChosen(avatar){
    
    frame = avatar.frame;
    
    switch(avatar.frame){
       case 0:
           name = 'Snake';
       break; 
       case 1:
           name = 'Hippo';
       break; 
       case 2:
           name = 'Rabbit';
       break; 
       case 3:
           name = 'Giraffe';
       break; 
       case 4:
           name = 'Pig';
       break; 
       case 5:
           name = 'Parrot';
       break; 
       case 6:
           name = 'Penguin';
       break; 
    }
    
    this.game.state.start("Game");  
}
