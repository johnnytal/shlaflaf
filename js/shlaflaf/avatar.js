var avatar = function(game){};
 
avatar.prototype = {
    create: function(){
        avatars = [];
        
        var bg = this.add.image(0, 0, 'bg');
             
        chooseText = this.add.text(85, 40, ":בחר מול איזה שמאלן להתמודד", {
            font: '32px', fill: '#cc0000', align: 'center'
        }); 
        chooseText.x = WIDTH / 2 - chooseText.width / 2;    
        
        for (a=0; a<7; a++){
            if (a > 3){
                y = 250;
                x = -260;
            } 
            else{ 
                y = 115; 
                x = 130;
            }
            avatars[a] = this.add.sprite(x + (a*110), y, 'avatars');
            avatars[a].scale.set(0.65, 0.65);
            avatars[a].frame = a;
            
            avatars[a].inputEnabled = true;
            avatars[a].input.useHandCursor = true;
            avatars[a].events.onInputDown.add(avatarChosen, this);
        }
    }
};