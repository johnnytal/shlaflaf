var game_over = function(game){};

game_over.prototype = {

    preload: function(){
        timeLabel.text = 'T i m e : 00';
        clearInterval(timer);
        optionLabel.text = 'GAME OVER!';
    },
    
    init: function(score, best){
        var bestMessage, message;
        
        try{
            banner.show();
        } catch(e){}
        
        if (best){
            bestMessage = '\n New high score!';
        }
        else{
            bestMessage = '';
        }
        
        message = 'Your score: \n' + score + bestMessage; 
     
        modal.createModal({
            type:"game_over",
            includeBackground: false,
            modalCloseOnInput: false,
            itemsArr: 
            [
                 {
                    type: "image",
                    content: "panel",
                    contentScale: 1.3
                },
                {
                    type: "text",
                    content: message,
                    fontFamily: font,
                    fontSize: 36,
                    offsetY: -100,
                    color: "0xffff00",
                    stroke: "0xff0000",
                    strokeThickness: 2
                },
                {
                    type: "image",
                    content: "inst",
                    offsetY: 70,
                    offsetX: 60,
                    callback: function () { // menu
                        game.state.start('Preloader');
                        
                        socialService.submitScore( score, function(error){});
                        socialService.showLeaderboard(function(error){});
      
                        if (score > 999) socialService.submitAchievement(CgkIv-vN4MUBEAIQAQ, function(error){});

                    }
                },            
                {
                    type: "image",
                    content: "replay",
                    offsetY: 70,
                    offsetX: -60,
                    callback: function () { // new game
                        game.state.start('Avatar');
                        
                        socialService.submitScore( score, function(error){});
                        
                        if (score > 999) socialService.submitAchievement(CgkIv-vN4MUBEAIQAQ, function(error){});
                        socialService.showAchievements(function(error){});
                    }
                }
            ]
        });   
            
        modal.showModal("game_over");
        for (n=0; n<4; n++){
            game.add.tween(modal.getModalItem('game_over',n)).from( { y: - 800 }, 500, Phaser.Easing.Linear.In, true);
        }
        
        replayImg = modal.getModalItem('game_over',2);
        replayImg.input.useHandCursor = true;
        
        playImg = modal.getModalItem('game_over',3);
        playImg.input.useHandCursor = true;
    }
};
