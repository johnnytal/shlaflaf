var avatar = function(game){};
 
avatar.prototype = {
    preload: function(){ 

    },
    
    create: function(){

        avatars = [];
        
        var bg = this.add.image(0, 0, 'bg');
        bg.alpha = 0.8;
             
        this.add.text(60, 40, "C h o o s e   A v a t a r   T o   S t a r t   P l a y i n g  :", {
            font: '24px ' + font, fill: '#cc0000', align: 'center'
        });     
        
        names = ['  snake', '  hippo', ' rabbit', 'giraffe', '     pig', 'parrot', 'penguin'];
        
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
            
            this.add.text(x+10 + (a*110), y + 85, names[a], {
                font: '16px ' + font, fill: 'lightblue', align: 'left', stroke:'#000', strokeThickness: 1
            });
        }
        
            if (banner == null){
                Cocoon.Ad.AdMob.configure({
                    android: { 
                          banner:"ca-app-pub-9795366520625065/8387859836"
                    }
                });
                
                banner = Cocoon.Ad.AdMob.createBanner();
                banner.load();
                
                banner.on("load", function(){
                    banner.setLayout( Cocoon.Ad.BannerLayout.BOTTOM_CENTER );
                });
            }
            
            banner.show();
    }, 
};
