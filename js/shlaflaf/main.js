var game_main = function(game){
    var buttons, options, life, option_to_create, labels, rndTime;
    frame = 0;
    
    cords1 = [235, 221, 155, 185];
    cords2 = [415, 220, 335, 185];
    
    cordsArray = [cords1, cords2];
    
    crazy = false;
    //doubleCrazy = false;
    
    score = 0;
    lives = 3;
    lifeSprite = [];
    time_factor = 0;
    time_left = 150;
    init_time = time_left;
    
    RND_TIME = 137;
    CRZ_TIME = 112;
    
    options1A = ['ליברמן' , 'גנץ', 'התקשורת', 'בוגי', 'סער', 'ריבלין', 'לפיד', 'מנדלבליט', 'בית המשפט', 'אובמה', 'אלשיך'];
};

game_main.prototype = {
    create: function(){
    	try{AdMob.hideBanner();} catch(e){}
    	
        var bg = this.add.image(0, 0, 'bg');
        bg.alpha = 0.7;
        
        var cloud = this.add.image(130, 45, 'cloud');
        cloud.alpha = 0.7;
        cloud.scale.set(0.72, 0.38);

        lives = 3;
        score = 0;
        time_factor = 0;
        time_left = 150;
        init_time = time_left;
        crazy = false;
        
        var ilyich = this.add.image(15, 175, 'ilyich');
        var avatar = this.add.sprite(WIDTH - 132, 200, 'avatars');
        avatar.frame = frame;
        
        for (l=0; l<lives; l++){
            lifeSprite[l] = this.add.sprite(490 + (l*45), 22, 'ilyich');
            lifeSprite[l].scale.set(0.2, 0.2);
        }

        var btn_kazabubu = this.add.sprite(335, 185, 'button');
        var btn_name = this.add.sprite(155, 185, 'button2');
        
        buttons = [btn_kazabubu, btn_name];

        for (b=0; b<buttons.length; b++){
            buttons[b].inputEnabled = true;
            buttons[b].input.useHandCursor = true;
            buttons[b].events.onInputDown.add(userInput, this);
            buttons[b].scale.set(1.05, 1.05);
        }
        
        bestScore = Math.round(localStorage.getItem("shlaflaf-bestScore"));
        if (bestScore == null) bestScore = 0;
        
        bestScoreLebal = this.add.text(20, 440, bestScore + ' :השיא שלך', {
            font: '21px', fill: 'white', align: 'center'
        });

        btn_kazabubuLabel = this.add.text(415, 220, 'שמאלן', {
            font: '25px', fill: '#cc0000', align: 'center'
        }); btn_kazabubuLabel.anchor.set(0.5, 0.5);

        btn_nameLabel = this.add.text(235, 220, options1A[game.rnd.integerInRange(0, options1A.length-1)], {
            font: '25px', fill: '#cc0000', align: 'center'
        }); btn_nameLabel.anchor.set(0.5, 0.5);
        
        labels = [btn_kazabubuLabel, btn_nameLabel];
        
        optionLabel = this.add.text(335, 100, '', {
            font: '38px', fill: 'blue', align: 'center', 

        }); optionLabel.anchor.set(0.5, 0.5);
        
        optionLabel.setShadow(1, 1, 'rgba(0,0,0,0.4)', 5);
        
        timeLabel = this.add.text(280, 10, time_left + ':ז מ ן', {
            font: '22px', fill: 'red', align: 'center'
        });
        
        scoreLabel = this.add.text(18, 25, score + " :ניקוד", {
            font: '26px', fill: 'darkgreen', align: 'center', stroke:'lightyellow', strokeThickness: 2
        });
        
        exit_btn = this.add.button(580, 425, 'exit_btn');       
        exit_btn.inputEnabled = true;
        exit_btn.input.useHandCursor = true;
        
        exit_btn.events.onInputDown.add(function(){ 
            exit_btn.inputEnabled = false;
            gameOver(); 
            if(AdMob) AdMob.showInterstitial();
        }, this);
        
        barksSfx = [
            game.add.audio('bark1', 0.6, false),
            game.add.audio('bark2', 0.6, false),
            game.add.audio('bark3', 0.6, false),
            game.add.audio('bark4', 0.6, false)
        ];
        
        bottleSfx = game.add.audio('bottle', 1, false);
        clickSfx = game.add.audio('click', 1, false);
        failSfx = game.add.audio('fail', 0.8, false);
        gameOverSfx = game.add.audio('gameOver', 0.7, false);
        musicSfx = game.add.audio('music', 1, true);
        successSfx = game.add.audio('success', 0.7, false);
        waitingSfx = game.add.audio('waiting', 0.2, false);
        
        createOption(); 
        
        modal = new gameModal(game);
        
        setTimeout(function(){musicSfx.play();}, 500);
        
        initAd();
    },
    
    update: function(){
        
        for (b = 0; b < buttons.length; b++){
            if (crazy){
                try{
                    labels[b].body.velocity.x = buttons[b].body.velocity.x;
                    labels[b].body.velocity.y = buttons[b].body.velocity.y;
                }catch(e){}
            }
        }       
    }
};

function userInput(btn){
    btn.tint = 0x00ffff;
    chosen = String(btn.key + option_to_create);
    userPressed(chosen);
    clickSfx.play();  
}

function userPressed(chosen){
    clearInterval(timer);
    waitingSfx.stop();
    
    for (b=0; b<buttons.length; b++){
        buttons[b].inputEnabled = false;
        exit_btn.inputEnabled = false;
        buttons[b].input.useHandCursor = false;
    } 
 
    if (chosen == 'button1' || chosen == 'button20'){
        var factor = 1;
        
        if (init_time < 100 && init_time >= 70){
            factor = 3;
        }
        else if (init_time < 70){
           factor = 5; 
        }
        else if (init_time < 20){
           factor = 7; 
        }
        
        timeBonus = Math.round((time_left / init_time) * 100);
        rounded = (Math.round(timeBonus / 10) * 10) * factor;
        if (rounded == 0) rounded = 10 * factor;
        
        score += rounded;
        scoreLabel.text = score + " :ניקוד";
        
        optionLabel.text = rounded + 'pts';
        optionLabel.fill = '#885ead';
        
        barksSfx[game.rnd.integerInRange(0, barksSfx.length - 1)].play();
    }
    else{
       takeLife();
       
       optionLabel.text = '! א ו פ ס';
       optionLabel.fill = 'red';
       
       failSfx.play();
    }    

    rndTime = game.rnd.integerInRange(100, init_time * 20);
    
    setTimeout(function(){
        if (lives > 0){
            createOption();
        }
    }, rndTime);      
}

function createOption(){
    optionLabel.y = 100;
    optionLabel.fill = '#1874CD';
    
    option_to_create = game.rnd.integerInRange(0, 1);
    
    options = ['!שמאלן', ' !' + options1A[game.rnd.integerInRange(0, options1A.length-1)]];
    
    optionLabel.text = options[option_to_create];

    btn_nameLabel.text = options1A[game.rnd.integerInRange(0, options1A.length-1)];
	
	if (time_factor < 134){
    	time_factor += 2;
	    time_left = 150 - time_factor;  
	    init_time = time_left;
    }
    
    if (init_time < RND_TIME && init_time >= CRZ_TIME){
    	randomizeBtns();
    }
    else if (init_time < CRZ_TIME){
    	crazy = true;
    	randomizeBtns();
    } 
    
    successSfx.play();
    
    setTimeout(function(){ waitingSfx.play(); },300);
    
    timer = setInterval(function(){
	    if (time_left > 0){
	    	time_left--;
		    timeLabel.text = time_left + ' : ז מ ן';
	    }
        else{
           userPressed(0);
           timeLabel.text = 'T i m e : 0' + time_left; 
        }
    }, 30);
    
    for (b=0; b<buttons.length; b++){
        buttons[b].inputEnabled = true;
        exit_btn.inputEnabled = true;
        buttons[b].input.useHandCursor = true;
        buttons[b].tint = 0xffffff;
        /*
        if (!doubleCrazy){
        	buttons[b].tint = 0xffffff;
        }
        else{
    		buttons[b].tint = Math.random() * 0xffffff;
        }*/
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
        	if (lives == 0) gameOver();
            
            bottleSfx.play();
            
            setTimeout(function(){
                bottle.kill(); 
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

function randomizeBtns(){
    var btn_locations = [];
    
    while(btn_locations.length < 2){
         var randomnumber = game.rnd.integerInRange(0, 1);
          
         var found = false;
          
         for(var i=0;i<btn_locations.length;i++){
            if(btn_locations[i]==randomnumber){
                found = true;
                break;
            }
         }
          
         if(!found){
             btn_locations[btn_locations.length] = randomnumber;
         }
    }

    buttons[0].x = cordsArray[btn_locations[0]][2];
    buttons[0].y = cordsArray[btn_locations[0]][3];   
    
    btn_kazabubuLabel.x = cordsArray[btn_locations[0]][0];
    btn_kazabubuLabel.y = cordsArray[btn_locations[0]][1];

    buttons[1].x = cordsArray[btn_locations[1]][2];
    buttons[1].y = cordsArray[btn_locations[1]][3];
    
    btn_nameLabel.x = cordsArray[btn_locations[1]][0];
    btn_nameLabel.y = cordsArray[btn_locations[1]][1];

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
        
        buttons[b].body.gravity.x = game.rnd.integerInRange(-(100 - init_time), 100 - init_time) * (b + game.rnd.integerInRange(-2, 2));  
        buttons[b].body.gravity.y = game.rnd.integerInRange(-(100 - init_time), 100 - init_time) * (b + game.rnd.integerInRange(-2, 2));
    }    
}

function gameOver(){
    waitingSfx.stop();
    musicSfx.stop();
    
    gameOverSfx.play(); 
    game.state.start('GameOver', false, false, score, save_score()); 
}

function avatarChosen(avatar){
	 frame = avatar.frame;
	 this.game.state.start("Game");
}

function initAd(){
	var admobid = {
		interstitial: 'ca-app-pub-9795366520625065/5332573457',
		banner: 'ca-app-pub-9795366520625065/5524145146'
	};
 	
 	if(AdMob) AdMob.createBanner({
  	  	adId: admobid.banner,
  	  	position: AdMob.AD_POSITION.BOTTOM_CENTER,
  	  	autoShow: true
  	});	
  	
  	if(AdMob) AdMob.prepareInterstitial({
  		adId:admobid.interstitial, 
  		autoShow:false
  	});
}
