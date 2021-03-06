displayElement = document.getElementById("input-display");



// var sounds;

var input = {
    currentInput: [],
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
            }
        }
    },
    attack: function() {
        console.log("attack");
    },

    randomizeCommand: function(commandArray) {
        let commandCurrentlyExists = true;
        while (commandCurrentlyExists) {
            for (x in commandArray) {
                commandArray[x] = randomLetterExcept(commandArray[x]);
                if (commandExists(commandArray)) {
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
    }

}

// We define commandList outside the command object because it won't work otherwise.
command.commandList = [command.attackCommand];

document.getElementById("a-button").addEventListener("click", input.pressA);
window.addEventListener("keydown", function(e){
    if (e.code == 'KeyA') {
        document.getElementById("a-button").style.content='url("images/blue-A-pushed.png")';
        input.pressA();
    }
});
window.addEventListener("keyup", function(e){
    if (e.code == 'KeyA') {
        document.getElementById("a-button").style.content='url("images/blue-A.png")';
    }
});

document.getElementById("b-button").addEventListener("click", input.pressB);
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

document.getElementById("c-button").addEventListener("click", input.pressC);
window.addEventListener("keydown", function(e){
    if (e.code == 'KeyZ') {
        document.getElementById("c-button").style.content='url("images/red-C-pushed.png")';
        input.pressC();
    }
});
window.addEventListener("keyup", function(e){
    if (e.code == 'KeyZ') {
        document.getElementById("c-button").style.content='url("images/red-C.png")';
    }
});

document.getElementById("d-button").addEventListener("click", input.pressD);
window.addEventListener("keydown", function(e){
    if (e.code == 'KeyX') {
        document.getElementById("d-button").style.content='url("images/yellow-D-pushed.png")';
        input.pressD();
    }
});
window.addEventListener("keyup", function(e){
    if (e.code == 'KeyX') {
        document.getElementById("d-button").style.content='url("images/yellow-D.png")';
    }
});

document.getElementById("enter-button").addEventListener("click", input.pressEnter);
window.addEventListener("keydown", function(e){
    if (e.code == 'Enter' || e.code == 'Space') {
        document.getElementById("enter-button").style.content='url("images/silver-!arrowright-pushed.png")';
        input.pressEnter();
    }
});
window.addEventListener("keyup", function(e){
    if (e.code == 'Enter' || e.code == 'Space') {
        document.getElementById("enter-button").style.content='url("images/silver-!arrowright.png")';
    }
});

document.getElementById("clear-button").addEventListener("click", input.pressClear);
window.addEventListener("keydown", function(e){
    if (e.code == 'Backspace') {
        document.getElementById("clear-button").style.content='url("images/silver-blank-pushed.png")';
        input.pressClear();
    }
});
window.addEventListener("keyup", function(e){
    if (e.code == 'Backspace') {
        document.getElementById("clear-button").style.content='url("images/silver-!blank.png")';
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