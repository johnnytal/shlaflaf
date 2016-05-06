var avatar = function(game){};
 
avatar.prototype = {
    preload: function(){ 

    },
    
    create: function(){

        avatars = [];
        
        var bg = this.add.image(0, 0, 'bg');
        bg.alpha = 0.8;
             
        this.add.text(this.game.world.centerX - 220, 40, "Choose Avatar To Start Playing :", {
            font: '24px ' + font, fill: 'red', fontWeight: 'bold', align: 'center'
        });     
        
        for (a=0; a<7; a++){
            if (a > 3){
                y = 230;
                x = -220;
            } 
            else{ 
                y = 115; 
                x = 130;
            }
            avatars[a] = this.add.sprite(x + (a*100), y, 'avatars');
            avatars[a].scale.set(0.65, 0.65);
            avatars[a].frame = a;
            
            avatars[a].inputEnabled = true;
            avatars[a].input.useHandCursor = true;
            avatars[a].events.onInputDown.add(avatarChosen, this);
        }
    }, 
};
