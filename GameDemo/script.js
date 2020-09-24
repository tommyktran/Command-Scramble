var game = {
    isRunning: false,

    playerShield: 100,
    playerAmmo: 10,
    timeSurvived: 0.0,

    start: function() {
        game.isRunning = true;
        game.resetGameVars();
        window.setTimeout(instance, 100);
        // while (game.isRunning) {
        //     game.process();
        // }
    },
    gameOver: function() {
        game.isRunning = false;
        
    },
    resetGameVars: function() {
        playerShield = 100;
        playerAmmo = 10;
        timeSurvived = 0.0;
        time = 0;
        elapsed = '0.0';
        start = new Date().getTime()
    },
    process: function() {

    },

    changePlayerShield: function(amount) {
        game.playerShield += amount;
        if (playerShield <= 0) {
            isRunning = false;
        }
    }
}

var start = new Date().getTime(),
    time = 0,
    elapsed = '0.0';

function instance()
{   
    if (game.isRunning) {
    time += 100;

    elapsed = Math.floor(time / 100) / 10;
    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

    document.getElementById("time-survived").innerHTML = elapsed;
    game.timeSurvived = elapsed;

    var diff = (new Date().getTime() - start) - time;  
    } 
    window.setTimeout(instance, (100 - diff));
}

