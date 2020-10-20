displayElement = document.getElementById("input-display");
// var buttonSound = document.getElementById("sound");
// document.getElementById("backgroundMusic").loop = true;
// document.getElementById("backgroundMusic").play();

// var sounds;

enemy1Element = document.getElementById("enemy1");
enemy2Element = document.getElementById("enemy2");
enemy3Element = document.getElementById("enemy3");

var input = {
    currentTarget: "",
    currentInput: [],
    pressButton: function(button) {
        if (button == "A") {
            this.pressA();
        } else if (button == "B") {
            this.pressB();
        } else if (button == "C") {
            this.pressC();
        } else if (button == "D") {
            this.pressD();
        } else if (button == "Enter") {
            this.pressEnter();
        } else if (button == "Clear") {
            this.pressClear();
        }
    },
    pressA: function() {
        input.currentInput.push("A");
        input.updateDisplay();
    },
    pressB: function() {
        input.currentInput.push("B");
        input.updateDisplay();
    },
    pressC: function() {
        input.currentInput.push("C");
        input.updateDisplay();
    },
    pressD: function() {
        input.currentInput.push("D");
        input.updateDisplay();
    },
    pressEnter: function() {
        command.processInput(input.currentInput);
        input.currentInput = [];
        input.updateDisplay();
    },
    pressClear: function() {
        input.currentInput = [];
        input.updateDisplay();
        input.setTarget("");
    },
    updateDisplay: function() {
        displayElement.innerHTML = input.currentInput.join("");
    },
    targetEnemy: function(target) {
        if (target == "1") {
            input.setTarget("1");
        }
        if (target == "2") {
            input.setTarget("2");
        }
        if (target == "3") {
            input.setTarget("3");
        }
    },

    setTarget: function(target) {
        let oldTarget = "";
        if (target == "") {
            if (input.currentTarget != "") {
                document.getElementById("target"+input.currentTarget).classList.toggle("notTargeted");
                input.currentTarget = target; 
            }
        } else if (input.currentTarget == "") {
            input.currentTarget = target;
            document.getElementById("target"+target).classList.toggle("notTargeted");
        } else if (input.currentTarget == target) {
            input.currentTarget = "";
            document.getElementById("target"+target).classList.toggle("notTargeted");
        } else if (input.currentTarget != target) {
            oldTarget = input.currentTarget;
            input.currentTarget = target;
            document.getElementById("target"+target).classList.toggle("notTargeted");
            if (oldTarget != "") {
                document.getElementById("target"+oldTarget).classList.toggle("notTargeted");
            }
        }
    }
}

var game = {
    isRunning: false,

    playerShield: 100,
    playerAmmo: 10,
    timeSurvived: 0.0,

    start: function() {
        game.isRunning = true;
        game.resetGameVars();
        document.getElementById("player-shield").innerHTML = game.playerShield;
        document.getElementById("player-ammo").innerHTML = game.playerAmmo;

        window.setTimeout(instance, 100);
        document.getElementById("screen").style = "display:none;";
        document.getElementById("instructions").style = "display:none;";
        
        setTimeout(function() {enemy.spawnEnemy(1)}, 500);
        setTimeout(function() {enemy.spawnEnemy(2)}, 300);
        setTimeout(function() {enemy.spawnEnemy(3)}, 600);
    },
    gameOver: function() {
        game.isRunning = false;
        document.getElementById("screen").style = "display:flex;";
        document.getElementById("gameover").style = "display:block;";
        document.getElementById("gameover-survived-amt").innerHTML = game.timeSurvived;
        document.getElementById("gameover-survived").style = "display:block;";
    },
    resetGameVars: function() {
        game.playerShield = 100;
        game.playerAmmo = 10;
        game.timeSurvived = 0.0;
        time = 0;
        elapsed = '0.0';
        start = new Date().getTime()
    },
    changePlayerShield: function(amount) {
        game.playerShield += amount;
        if (game.playerShield <= 0) {
            game.playerShield = 0;
            game.gameOver();
        }
        document.getElementById("player-shield").innerHTML = game.playerShield;
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
     
    window.setTimeout(instance, (100 - diff));
    }
}

var command = {
    attackCommand: ["A", "B", "C"],
    reloadCommand: ["D", "A"],
    commandList: [],
    processInput: function(inputArray) {
        for (x in command.commandList) {
            if (arraysEqual(command.commandList[x], inputArray)) {
                switch (command.commandList[x]) {
                    case command.attackCommand:
                        command.attack();
                        break;
                    case command.reloadCommand:
                        command.reload();
                        break;
                }
            }
        }
    },
    attack: function() {
        if (input.currentTarget == "") {
            command.log("ATTACK: failed, no target");
        } else if (game.playerAmmo <= 0) {
            command.log("ATTACK: failed, no ammo");

        } else {
            game.playerAmmo--;
            document.getElementById("player-ammo").innerHTML = game.playerAmmo;
            enemy.attackEnemy(input.currentTarget);
        }
        input.pressClear();
    },
    reload: function() {
        command.log("RELOAD: success");
        game.playerAmmo = 10;
        document.getElementById("player-ammo").innerHTML = game.playerAmmo;
    },

    randomizeCommand: function(commandArray) {
        let commandCurrentlyExists = true;
        while (commandCurrentlyExists) {
            for (x in commandArray) {
                commandArray[x] = randomLetterExcept(commandArray[x]);
                if (!(commandExists(commandArray))) {
                    commandCurrentlyExists = false;
                }
            }
        }
        return commandArray;
    },
    randomizeAllCommands: function() {
        for (x in command.commandList) {
            this.randomizeCommand(this.commandList[x]);
        }
    },
    log: function(text) {
        let log1Element = document.getElementById("log1");
        let log2Element = document.getElementById("log2");
        let log3Element = document.getElementById("log3");

        log3Element.innerHTML = log2Element.innerHTML;
        log2Element.innerHTML = log1Element.innerHTML;
        log1Element.innerHTML = text;
    },

    logInvalid: function() {
        command.log("Invalid command.");
    }

}
var enemyTimeouts = []
var enemy = {
    basicEnemy: {
        name: "enemy-basic",
        hp: 1,
        startup: 1500,
        attackSpeed: 200,
        attack: 1,
        doAttack: function() {
            if (this.hp > 0 && game.isRunning) {
                game.changePlayerShield(this.attack * -1);
                setTimeout(() => {this.doAttack()}, this.attackSpeed);
            } else {
                return;
            }
        },
        process: function() {
            setTimeout(() => {this.doAttack()}, this.startup);
        }   
        
    },
    enemyArray: ["", "", ""],
    
    attackEnemy: function(target) {
        let targetedEnemy = enemy.enemyArray[target-1];
        if (targetedEnemy == "") {
            command.log("ATTACK: failed, no enemy to attack")
        } else {
            targetedEnemy.hp -= 1;
            console.log(targetedEnemy.hp);
            if (targetedEnemy.hp <= 0) {
                enemy.killEnemy(target);
                command.log("ATTACK: success, killed enemy");
            } else {
                command.log("ATTACK: success, damaged enemy");
            }
        }
    },
    spawnEnemy: (enemySlot, enemyType = enemy.basicEnemy) => {
        let enemyElement = document.getElementById("enemy"+enemySlot);
        let enemyDivElement = document.getElementById("enemy"+enemySlot+"-div");
        
        enemy.enemyArray[enemySlot-1] = Object.assign({}, enemyType);
        enemyDivElement.className = enemyType.name + " flyIn";
        

        // Sets a timeout before the "enemy" class is enabled to prevent players
        // from killing enemies as soon as they are spawned.
        setTimeout(function() {
            enemyElement.classList.toggle("enemy")
            enemy.enemyArray[enemySlot-1].process();
        }, 800);
    },
        
    killEnemy: function(target) {
        let enemyElement = document.getElementById("enemy"+target);
        let enemyDivElement = document.getElementById("enemy"+target+"-div");
        
        currentTarget = "";
        input.setTarget(target);

        enemy.enemyArray[target-1] = "";

        enemyElement.classList.toggle("enemy");
        enemyDivElement.className = "";
        // This hack puts an explosion gif and adds a random number to the end so it plays every time.
        enemyDivElement.insertAdjacentHTML('beforebegin', '<img src=images/explosion.gif?a='+Math.random()+' id="explosion">')
        // Removes the explosion gif
        setTimeout(function() {document.getElementById("explosion").remove()}, 600);

        // When you kill an enemy, it sets a delay to spawn another enemy
        // The delay is random.
        let randomDelay = Math.random() * (3500 - 1000) + 1000
        setTimeout(function() {enemy.spawnEnemy(target)}, randomDelay);
    }
}



function commandExists(commandArray) {
    let oldCommand = commandArray;
    // Checks if a command's notation is already taken.
    // Also checks to make sure that it is not the same command as before.
    for (x in command.commandList) {
        if (commandArray == command.commandList[x] && commandArray != oldCommand) {
            return true;
        } else {
        return false;
        }
    } 
}

// We define commandList outside the command object because it won't work otherwise.
command.commandList = [command.attackCommand, command.reloadCommand];

document.getElementById("a-button").addEventListener("click", function(){input.pressButton("A")});
window.addEventListener("keydown", function(e){
    if (e.code == 'KeyA') {
        document.getElementById("a-button").style.content='url("images/blue-A-pushed.png")';
        input.pressButton("A");
    }
});
window.addEventListener("keyup", function(e){
    if (e.code == 'KeyA') {
        document.getElementById("a-button").style.content='url("images/blue-A.png")';
    }
});

document.getElementById("b-button").addEventListener("click", function(){input.pressButton("B")});
window.addEventListener("keydown", function(e){
    if (e.code == 'KeyS') {
        document.getElementById("b-button").style.content='url("images/green-B-pushed.png")';
        input.pressB();
    }
});
window.addEventListener("keyup", function(e){
    if (e.code == 'KeyS') {
        document.getElementById("b-button").style.content='url("images/green-B.png")';
    }
});

document.getElementById("c-button").addEventListener("click", function(){input.pressButton("C")});
window.addEventListener("keydown", function(e){
    if (e.code == 'KeyZ') {
        document.getElementById("c-button").style.content='url("images/red-C-pushed.png")';
        input.pressButton("C");
    }
});
window.addEventListener("keyup", function(e){
    if (e.code == 'KeyZ') {
        document.getElementById("c-button").style.content='url("images/red-C.png")';
    }
});

document.getElementById("d-button").addEventListener("click", function(){input.pressButton("D")});
window.addEventListener("keydown", function(e){
    if (e.code == 'KeyX') {
        document.getElementById("d-button").style.content='url("images/yellow-D-pushed.png")';
        input.pressButton("D");
    }
});
window.addEventListener("keyup", function(e){
    if (e.code == 'KeyX') {
        document.getElementById("d-button").style.content='url("images/yellow-D.png")';
    }
});

document.getElementById("enter-button").addEventListener("click", function(){input.pressButton("Enter")});
window.addEventListener("keydown", function(e){
    if (e.code == 'Enter' || e.code == 'Space') {
        document.getElementById("enter-button").style.content='url("images/silver-!arrowright-pushed.png")';
        input.pressButton("Enter");
    }
});
window.addEventListener("keyup", function(e){
    if (e.code == 'Enter' || e.code == 'Space') {
        document.getElementById("enter-button").style.content='url("images/silver-!arrowright.png")';
    }
});

document.getElementById("clear-button").addEventListener("click", function(){input.pressButton("Clear")});
window.addEventListener("keydown", function(e){
    if (e.code == 'Backspace') {
        document.getElementById("clear-button").style.content='url("images/silver-blank-pushed.png")';
        input.pressButton("Clear");
    }
});
window.addEventListener("keyup", function(e){
    if (e.code == 'Backspace') {
        document.getElementById("clear-button").style.content='url("images/silver-!blank.png")';
    }
});

document.getElementById("enemy1").addEventListener("click", function(){input.targetEnemy("1")});
window.addEventListener("keydown", function(e){
    if (e.code == 'KeyQ') {
        input.targetEnemy("1");
    }
});
document.getElementById("enemy2").addEventListener("click", function(){input.targetEnemy("2")});
window.addEventListener("keydown", function(e){
    if (e.code == 'KeyW') {
        input.targetEnemy("2");
    }
});
document.getElementById("enemy3").addEventListener("click", function(){input.targetEnemy("3")});
window.addEventListener("keydown", function(e){
    if (e.code == 'KeyE') {
        input.targetEnemy("3");
    }
});

document.getElementById("button").addEventListener("click", function(){game.start()});


function randomLetterExcept(letter) {
    let letterArray = []
    if (letter == "A") {
        letterArray = ["B", "C", "D"];
    }
    if (letter == "B") {
        letterArray = ["A", "C", "D"];
    }
    if (letter == "C") {
        letterArray = ["B", "A", "D"];
    }
    if (letter == "D") {
        letterArray = ["B", "C", "A"];
    }
    return letterArray[Math.floor(Math.random() * 3)];
}



//This function checks if two arrays are equal, because you can't compare them with ==.
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
