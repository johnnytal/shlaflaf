var game_over = function(game){};

game_over.prototype = {

    preload: function(){
        timeLabel.text = '';
        clearInterval(timer);
        optionLabel.text = 'GAME OVER!';
    },
    
    init: function(score, best){
        var bestMessage, message; 

        if (best){
            bestMessage = '\n!שיא חדש';
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
                    contentScale: 1.35
                },
                {
                    type: "text",
                    content: message,
                    fontSize: 36,
                    offsetY: -80,
                    color: "0x00ff00",
                    stroke: "0xff0000",
                    strokeThickness: 2
                },
                {
                    type: "image",
                    content: "inst",
                    offsetY: 70,
                    offsetX: 60,
                    callback: function () { // menu
                        try{if(AdMob) AdMob.showInterstitial(); AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);} catch(e){}
                        game.state.start('Preloader');
                    }
                },            
                {
                    type: "image",
                    content: "replay",
                    offsetY: 70,
                    offsetX: -60,
                    callback: function () { // new game
						try{if(AdMob) AdMob.showInterstitial(); AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);} catch(e){}
                        game.state.start('Avatar');
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
