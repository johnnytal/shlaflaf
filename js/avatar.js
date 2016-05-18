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
  
        leadersBtn = this.add.sprite(50, 370,'leadersBtn');
        leadersBtn.scale.set(0.7, 0.7);   
        
        leadersBtn.inputEnabled = true;
        leadersBtn.input.useHandCursor = true;
        
        leadersBtn.events.onInputDown.add(function(){ 
            leadersBtn.frame = 2;
            showLeaders();
        }, this); 
        
        leadersBtn.events.onInputUp.add(function(){ 
            if (!googlelogindone) leadersBtn.frame = 0;
            else { leadersBtn.frame = 1; }
        }, this); 
        
        var logInText;
        
        if (googlelogindone){
            leadersBtn.frame = 1;
            logInText = 'See the Leaderboard!';
        }
        else{
            leadersBtn.frame = 0;
            logInText = 'Log In to see the Leaderboard!';
        }
        
        this.add.text(120, 380, logInText, {
            font: '13px ' + font, fill: 'darkblue', align: 'left', stroke:'#fff', strokeThickness: 1
        });
        
        arrowL = this.add.image(120, 400,'arrow_l');
        arrowL.scale.set(0.7, 0.7); 
    }, 
};

function LogIn(){          
    try{
        Cocoon.Social.GooglePlayGames.init({
             defaultLeaderboard: "CgkIv-vN4MUBEAIQBw"
        });
        socialService = Cocoon.Social.GooglePlayGames.getSocialInterface();

        socialService.login(function(loggedIn, error) {});
        googlelogindone = true;
        leadersBtn.frame = 1;
        
    } catch(e){ alert('There was a problem :('); }
}

function showLeaders(){
    try{
        if (googlelogindone){
            socialService.showLeaderboard(function(error){});
        }
        else{
            LogIn();
        }
    } catch(e){ alert('There was a problem :('); }    
}
