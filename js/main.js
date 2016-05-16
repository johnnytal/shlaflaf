var game_main = function(game){
    var buttons, options, life, option_to_create, labels, rndTime;
    
    cords1 = [235, 221, 155, 185];
    cords2 = [415, 220, 335, 185];
    cords3 = [415, 298, 335, 260];
    cords4 = [235, 300, 155, 260];
    
    cordsArray = [cords1, cords2, cords3, cords4];
    
    score = 0;
    lives = 3;
    lifeSprite = [];
    time_factor = 0;
    time_left = 100;
    init_time = time_left;
};

game_main.prototype = {
    create: function(){
        var bg = this.add.image(0, 0, 'bg');
        bg.alpha = 0.7;
        
        var cloud = this.add.image(130, 50, 'cloud');
        cloud.alpha = 0.7;
        cloud.scale.set(0.72, 0.38);

        lives = 3;
        score = 0;
        time_factor = 0;
        time_left = 100;
        init_time = time_left;
        
        var ilyich = this.add.image(WIDTH - 135, 190, 'ilyich');
        var avatar = this.add.sprite(15, 200, 'avatars');
        avatar.frame = frame;
        
        for (l=0; l<lives; l++){
            lifeSprite[l] = this.add.sprite(490 + (l*45), 22, 'avatars');
            lifeSprite[l].frame = frame;
            lifeSprite[l].scale.set(0.3, 0.3);
        }

        var btn_shlaflaf = this.add.sprite(155, 185, 'button');
        var btn_kazabubu = this.add.sprite(335, 185, 'button2');
        var btn_ilyich = this.add.sprite(335, 260, 'button3');
        var btn_name = this.add.sprite(155, 260, 'button4');
        
        buttons = [btn_shlaflaf, btn_kazabubu, btn_ilyich, btn_name];
        options = ['S h l a f l a f!', 'K a z a b u b u!', 'I L Y I C H!', nameS + '!'];

        for (b=0; b<buttons.length; b++){
            buttons[b].inputEnabled = true;
            buttons[b].input.useHandCursor = true;
            buttons[b].events.onInputDown.add(userInput, this);
            buttons[b].scale.set(1.05, 1.05);
        }
        
        bestScore = localStorage.getItem("shlaflaf-bestScore");
        if (bestScore == null) bestScore = 0;
        
        bestScoreLebal = this.add.text(20, 440, 'High Score: ' + bestScore, {
            font: '17px ' + font, fill: 'yellow', fontWeight: 'normal', align: 'center',
            stroke:'#000', strokeThickness: 1
        });

        btn_shlaflafLabel = this.add.text(235, 221, 'Shlaflaf', {
            font: '25px ' + font, fill: '#cc0000', fontWeight: 'normal', align: 'center'
        }); btn_shlaflafLabel.anchor.set(0.5, 0.5);
        
        btn_kazabubuLabel = this.add.text(415, 220, 'Kazabubu', {
            font: '25px ' + font, fill: '#cc0000', fontWeight: 'normal', align: 'center'
        }); btn_kazabubuLabel.anchor.set(0.5, 0.5);
        
        btn_ilyichLabel = this.add.text(415, 298, 'ILYICH', {
            font: '25px ' + font, fill: '#cc0000', fontWeight: 'normal', align: 'center'
        }); btn_ilyichLabel.anchor.set(0.5, 0.5);
       
        btn_nameLabel = this.add.text(235, 300, name, {
            font: '25px ' + font, fill: '#cc0000', fontWeight: 'normal', align: 'center'
        }); btn_nameLabel.anchor.set(0.5, 0.5);
        
        labels = [btn_shlaflafLabel, btn_kazabubuLabel, btn_ilyichLabel, btn_nameLabel];
        
        optionLabel = this.add.text(335, 100, '', {
            font: '36px ' + font, fill: 'blue', fontWeight: 'normal', align: 'center', 
            stroke:'lightyellow', strokeThickness: 3
        }); optionLabel.anchor.set(0.5, 0.5);
        
        optionLabel.setShadow(1, 1, 'rgba(0,0,0,0.4)', 5);
        
        timeLabel = this.add.text(280, 10, 'T i m e: ' + time_left, {
            font: '22px ' + font, fill: 'red', fontWeight: 'normal', align: 'center'
        });
        
        scoreLabel = this.add.text(18, 25, 'Score: ' + score, {
            font: '26px ' + font, fill: 'darkgreen', fontWeight: 'normal', align: 'center'
        });
        
        exit_btn = this.add.button(580, 425, 'exit_btn');       
        exit_btn.inputEnabled = true;
        exit_btn.input.useHandCursor = true;
        
        exit_btn.events.onInputOver.add(function(){ 
            exit_btn.frame = 1;
        }, this);
        
        exit_btn.events.onInputOut.add(function(){ 
            exit_btn.frame = 0;
        }, this);
        
        exit_btn.events.onInputDown.add(function(){ 
            game.state.start('GameOver', false, false, score, save_score());
        }, this);

        createOption(); 
        
        modal = new gameModal(game);
        
        banner.hide();
    },
    
    update: function(){
        
        for (b = 0; b < buttons.length; b++){
            if (init_time < 75){
                try{
                    labels[b].body.velocity.x = buttons[b].body.velocity.x;
                    labels[b].body.velocity.y = buttons[b].body.velocity.y;
                }catch(e){}
            }
        }       
    }
};

function userInput(btn){
    if (time_left > 0){
        btn.tint = 0x00ffff;
        chosen = String(btn.key + option_to_create);
        userPressed(chosen);
    }
}

function userPressed(chosen){
    clearInterval(timer);
    
    for (b=0; b<buttons.length; b++){
        buttons[b].inputEnabled = false;
        exit_btn.inputEnabled = false;
        buttons[b].input.useHandCursor = false;
    } 
 
    if (chosen == 'button3' || chosen == 'button22' || chosen == 'button40' || chosen == 'button31'){
        var factor;
        
        if (init_time < 90 && init_time >= 75){
            factor = 3;
        }
        else if (init_time < 75){
           factor = 5; 
        }
        else{
            factor = 1;
        }
        
        timeBonus = Math.round((time_left / init_time) * 100);
        rounded = (Math.round(timeBonus/10) * 10) * factor;
        if (rounded == 0) rounded = 10 * factor;
        
        score += rounded;
        scoreLabel.text = 'Score: ' + score;
        
        optionLabel.text = '+' + rounded + ' pts';
        optionLabel.fill = 'purple';
        //game.add.tween(optionLabel).to( { y: -15 }, 490, Phaser.Easing.Linear.None, true);
    }
    else{
       takeLife();
       
       optionLabel.text = 'F A I L !';
       optionLabel.fill = 'red';
       //game.add.tween(optionLabel).to( { y: -10 }, 490, Phaser.Easing.Linear.None, true); 
    }    

    rndTime = game.rnd.integerInRange(300, 2500);
    
    setTimeout(function(){
        if (lives > 0){
            createOption();
        }
    }, rndTime);      
}

function createOption(){
    optionLabel.y = 100;
    optionLabel.fill = '#1874CD';
    
    option_to_create = game.rnd.integerInRange(0, 3);
    optionLabel.text = options[option_to_create];

    time_factor += 1;
    
    time_left = 100 - time_factor;
    init_time = time_left;
    
    if (init_time < 90 && init_time >= 75) randomizeBtns(false);
    else if (init_time < 75) randomizeBtns(true);

    timer = setInterval(function(){
       if (time_left > 0){
           time_left--;
           timeLabel.text = 'T i m e : ' + time_left; 
           
           if (time_left < 10) {
               timeLabel.text = 'T i m e : 0' + time_left; 
           }
       }
       
       else{
           userPressed(0);
           timeLabel.text = 'T i m e : 0' + time_left; 
       }
    }, 30);
    
    if (time_left > 0){
        for (b=0; b<buttons.length; b++){
            buttons[b].inputEnabled = true;
            exit_btn.inputEnabled = true;
            buttons[b].input.useHandCursor = true;
            buttons[b].tint = 0xffffff;
        }   
    } 
}

function takeLife(){
    lives--;
    
    if (lives > -1){
        lifeSprite[lives].kill();
        
        var bottle = game.add.image(178, 140, 'bottle');
        bottle.anchor.set(1, 0);
        bottle.angle = 60;
        tweenBottle = game.add.tween(bottle).to( { angle: -15 }, 120, Phaser.Easing.Linear.None, true); 
        
        tweenBottle.onComplete.add(function(){ 
            setTimeout(function(){
                bottle.kill(); 
                    if (lives == 0){ 
                        game.state.start('GameOver', false, false, score, save_score());
                    }
            }, rndTime);
        
        }, this);
    }
}

function save_score(){ // if it's the best score ever, save it to local storage
    if (score > bestScore){
        localStorage.setItem( "shlaflaf-bestScore", score );
        return true;
    }
    else{
        return false;
    }
}

function randomizeBtns(crazy){
    var btn_locations = [];
    
    while(btn_locations.length < 4){
         var randomnumber = game.rnd.integerInRange(0, 3);
          
         var found=false;
          
         for(var i=0;i<btn_locations.length;i++){
            if(btn_locations[i]==randomnumber){
                found=true;
                break;
            }
         }
          
         if(!found){
             btn_locations[btn_locations.length] = randomnumber;
         }
    }

    btn_shlaflafLabel.x = cordsArray[btn_locations[0]][0];
    btn_shlaflafLabel.y = cordsArray[btn_locations[0]][1];
    
    buttons[0].x = cordsArray[btn_locations[0]][2];
    buttons[0].y = cordsArray[btn_locations[0]][3];   
    
    btn_kazabubuLabel.x = cordsArray[btn_locations[1]][0];
    btn_kazabubuLabel.y = cordsArray[btn_locations[1]][1];
    
    buttons[1].x = cordsArray[btn_locations[1]][2];
    buttons[1].y = cordsArray[btn_locations[1]][3]; 
    
    btn_ilyichLabel.x = cordsArray[btn_locations[2]][0];
    btn_ilyichLabel.y = cordsArray[btn_locations[2]][1];
    
    buttons[2].x = cordsArray[btn_locations[2]][2];
    buttons[2].y = cordsArray[btn_locations[2]][3];   
    
    btn_nameLabel.x = cordsArray[btn_locations[3]][0];
    btn_nameLabel.y = cordsArray[btn_locations[3]][1];
    
    buttons[3].x = cordsArray[btn_locations[3]][2];
    buttons[3].y = cordsArray[btn_locations[3]][3];
    
    if (crazy) physicsBtns(); 
}

function physicsBtns(){
    
    for (b = 0; b < buttons.length; b++){
        
        game.physics.enable(buttons[b], Phaser.Physics.ARCADE);
        game.physics.enable(labels[b], Phaser.Physics.ARCADE);
        
        buttons[b].enableBody = true;
        labels[b].enableBody = true;

        buttons[b].body.collideWorldBounds=true;
        labels[b].body.collideWorldBounds=true;
        
        buttons[b].body.bounce.setTo(1, 1);
        labels[b].body.bounce.setTo(1, 1);
        
        buttons[b].body.gravity.x = game.rnd.integerInRange(-25, 25) * (b + game.rnd.integerInRange(-2, 2));  
        buttons[b].body.gravity.y = game.rnd.integerInRange(-25, 25) * (b + game.rnd.integerInRange(-2, 2));
 
    }    
}

function avatarChosen(avatar){
    banner.hide();
    
    frame = avatar.frame;
    
    switch(avatar.frame){
       case 0:
           nameS = 'S N A K E';
           name = 'SNAKE';
       break; 
       case 1:
           nameS = 'H I P P O';
           name = 'HIPPO';
       break; 
       case 2:
           nameS = 'R A B B I T';
           name = 'RABBIT';
       break; 
       case 3:
           nameS = 'G I R A F F E';
           name = 'GIRAFFE';
       break; 
       case 4:
           nameS = 'P I G';
           name = 'PIG';
       break; 
       case 5:
           nameS = 'P A R R O T';
           name = 'PARROT';
       break; 
       case 6:
           nameS = 'P E N G U I N';
           name = 'PENGUIN';
       break; 
    }
       
    try{
        Cocoon.Social.GooglePlayGames.init({});
        socialService = Cocoon.Social.GooglePlayGames.getSocialInterface();
        
        if (googlelogindone == false){
            socialService.login(function(loggedIn, error) {});
        }
    } catch(e){}
    
    this.game.state.start("Game");  
}
