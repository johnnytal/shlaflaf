var avatar = function(game){};
 
avatar.prototype = {
    preload: function(){ 

    },
    
    create: function(){

        avatars = [];
        
        var bg = this.add.image(0, 0, 'bg');
        bg.alpha = 0.8;
             
        this.add.text(150, 40, ": ב ח ר   ש מ א ל ן   כ ד י   ל ה ת ח י ל   ל ש ח ק", {
            font: '24px ' + font, fill: '#cc0000', align: 'center', stroke: "lightgrey", strokeThickness: 1
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
            avatars[a].events.onInputDown.add(avatarChosen, this);
        }
  
        leadersBtn = this.add.sprite(50, 370,'leadersBtn');
        leadersBtn.inputEnabled = true;
        leadersBtn.input.useHandCursor = true;

        leadersBtn.events.onInputDown.add(function(){ 
            leadersBtn.frame = 2;
            
            if (!googlelogindone) LogIn();
            else if (googlelogindone) showLeaders();
            
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
        
        logText = this.add.text(125, 390, logInText, {
            font: '12px ' + font, fill: 'darkblue', align: 'left', stroke:'#fff', strokeThickness: 1
        });
        
        logText.angle = 10;
        
        arrowL = this.add.image(125, 410,'arrow_l');
    }, 
};

function LogIn(){          
    try{
        Cocoon.Social.GooglePlayGames.init({
             defaultLeaderboard: "CgkIv-vN4MUBEAIQBw"
        });
        
        socialService = Cocoon.Social.GooglePlayGames.getSocialInterface();

        socialService.login(function(loggedIn, error) {
            if (error) {
                alert('There was a problem :(');
            }
            else if (loggedIn) {
                googlelogindone = true;
                leadersBtn.frame = 1;
                showLeaders();
            }   
        });
    } catch(e){}
}

function showLeaders(){
    try{
        socialService.showLeaderboard(function(error){});    
    } catch(e){ alert('There was a problem :('); }    
}
