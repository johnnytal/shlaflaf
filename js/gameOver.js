var game_over = function(game){};

game_over.prototype = {

    preload: function(){
        clearInterval(timer);
        timeLabel.text = 0;
        optionLabel.text = '';
    },
    
    init: function(score, best){
        var bestMessage, message;
        
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
                    contentScale: 1.35
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
                    content: "replay",
                    offsetY: 100,
                    callback: function () { // start a new game
                        game.state.start('Preloader');
                    }
                }
            ]
        });   
            
        modal.showModal("game_over");
        for (n=0; n<3; n++){
            game.add.tween(modal.getModalItem('game_over',n)).from( { y: - 800 }, 500, Phaser.Easing.Linear.In, true);
        }
        
        replayImg = modal.getModalItem('game_over',2);
        replayImg.input.useHandCursor = true;
    }
};
