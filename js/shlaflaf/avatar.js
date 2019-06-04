var avatar = function(game){};
 
avatar.prototype = {
    create: function(){
        avatars = [];
        
        var bg = this.add.image(0, 0, 'bg');
             
        this.add.text(100, 40, ": ב ח ר   ש מ א ל ן   כ ד י   ל ה ת ח י ל   ל ש ח ק", {
            font: '32px', fill: '#cc0000', align: 'center', stroke: "lightgrey", strokeThickness: 1
        });     
        
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
            avatars[a].events.onInputDown.add(function(){
            	 this.game.state.start("Game");
            }, this);
        }
    }
};