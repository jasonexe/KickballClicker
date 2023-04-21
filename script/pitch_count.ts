enum Action {
    STRIKE,
    BALL,
    FOUL,
    OUT,
    RUNNER_SCORED,
    KICKER_SAFE,
    TOGGLE_CLOCK
}

let pastStates: Array<GameState>;
// This gets cleared after something other than undo happens
let undoneStates: Array<GameState>;
let currentState: GameState;
let countdownTimer: PausableCountdownTimer;

let initializeGame = function () {
    currentState = new GameState();
    pastStates = new Array();
    undoneStates = new Array();
    // 2700000 MS = 45 minutes
    countdownTimer = new PausableCountdownTimer(2700000);
}

let undo = function () {
    if (pastStates.length === 0) {
        return;
    }
    undoneStates.push(currentState);
    currentState = pastStates.pop();
    updateUi(currentState);
}

let redo = function() {
    if (undoneStates.length === 0) {
        return;
    }
    pastStates.push(currentState);
    currentState = undoneStates.pop();
    updateUi(currentState);
}


let triggerAction = function (action: Action) {
    undoneStates = new Array();
    switch (action) {
        case Action.TOGGLE_CLOCK:
            switch (countdownTimer.getStatus()) {
                case "running":
                    countdownTimer.pause();
                    break;
                case "paused":
                    countdownTimer.resume();
                    break;
                case "stopped":
                    countdownTimer.start();
                    break;
            }
            break;
        case Action.STRIKE:
        case Action.BALL:
        case Action.FOUL:
        case Action.OUT:
        case Action.RUNNER_SCORED:
        case Action.KICKER_SAFE:
            pastStates.push(currentState);
            currentState = updateState(currentState, action);
            break;
    }
}