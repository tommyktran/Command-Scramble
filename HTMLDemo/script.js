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
        if (input.currentTarget == "") {
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

        // if (input.currentTarget != "") {
        //     oldTarget = input.currentTarget;
        //     document.getElementById("target"+target).classList.toggle("notTargeted");
        // }
        // if (input.currentTarget == target) {
        //     document.getElementById("target"+target).classList.toggle("notTargeted");
        //     input.currentTarget = "";
        // }
        // if (input.currentTarget != target) {
        //     input.currentTarget = target;
        //     if (oldTarget != "") {
        //         document.getElementById("target"+oldTarget).classList.toggle("notTargeted");  
        //     }
        // } else {
        //     input.currentTarget = "";
        // }
    }
}

var command = {
    attackCommand: ["A", "B", "C"],
    commandList: [],
    processInput: function(inputArray) {
        for (x in command.commandList) {
            if (arraysEqual(command.commandList[x], inputArray)) {
                // Make if statements for all the commands here.
                if (command.commandList[x] == command.attackCommand) {
                    command.attack();
                } 
            } else {
                    command.logInvalid();
                }
        }
    },
    attack: function() {
        if (input.currentTarget == "") {
            command.log("ATTACK: failed, no target");
        } else {
            enemy.attackEnemy(input.currentTarget);
        }
        input.pressClear();
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

var enemy = {
    basicEnemy: {
        name: "Basic Enemy",
        hp: 1,
        startup: 1,
        attack: 3
    },
    enemyArray: [],
    
    attackEnemy: function(target) {
        let targetedEnemy = enemy.enemyArray[target-1];
        if (targetedEnemy == "") {
            command.log("ATTACK: failed, no enemy to attack")
        } else {
            targetedEnemy.hp -= 1;
            if (targetedEnemy.hp <= 0) {
                enemy.killEnemy(target);
                command.log("ATTACK: success, killed enemy");
            } else {
                command.log("ATTACK: success, damaged enemy");
            }
        }
    },

    killEnemy: function(target) {
        let enemyElement = document.getElementById("enemy"+target);
        let enemyDivElement = document.getElementById("enemy"+target+"-div");
        
        currentTarget = "";
        input.setTarget(target);

        enemy.enemyArray[target-1] = "";

        enemyElement.classList.toggle("enemy");
        enemyDivElement.className = "";
    }
}
enemy.enemyArray = [enemy.basicEnemy, enemy.basicEnemy, enemy.basicEnemy];

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
command.commandList = [command.attackCommand];

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