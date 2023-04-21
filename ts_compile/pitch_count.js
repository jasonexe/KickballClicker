var Action;
(function (Action) {
    Action[Action["STRIKE"] = 0] = "STRIKE";
    Action[Action["BALL"] = 1] = "BALL";
    Action[Action["FOUL"] = 2] = "FOUL";
    Action[Action["OUT"] = 3] = "OUT";
    Action[Action["RUNNER_SCORED"] = 4] = "RUNNER_SCORED";
    Action[Action["KICKER_SAFE"] = 5] = "KICKER_SAFE";
    Action[Action["TOGGLE_CLOCK"] = 6] = "TOGGLE_CLOCK";
})(Action || (Action = {}));
// LocalStorage key for the current game state
let CURRENT_STATE = "CURRENT_STATE";
// LocalStorage key for the past states
let CURRENT_UNDO = "CURRENT_UNDO";
let pastStates;
// This gets cleared after something other than undo happens
let undoneStates;
let currentState;
let countdownTimer;
let initializeGame = function () {
    currentState = localStorage.getObject(CURRENT_STATE);
    if (!currentState) {
        currentState = new GameState();
    }
    pastStates = localStorage.getObject(CURRENT_UNDO);
    if (!pastStates) {
        pastStates = new Array();
    }
    undoneStates = new Array();
    // 2700000 MS = 45 minutes
    countdownTimer = new PausableCountdownTimer(2700000);
    updateUi(currentState);
    storeState();
};
let undo = function () {
    if (pastStates.length === 0) {
        return;
    }
    undoneStates.push(currentState);
    currentState = pastStates.pop();
    updateUi(currentState);
    storeState();
};
let redo = function () {
    if (undoneStates.length === 0) {
        return;
    }
    pastStates.push(currentState);
    currentState = undoneStates.pop();
    updateUi(currentState);
    storeState();
};
let triggerAction = function (action) {
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
    storeState();
};
let storeState = function () {
    localStorage.setObject(CURRENT_STATE, currentState);
    localStorage.setObject(CURRENT_UNDO, pastStates);
};
let resetState = function () {
    if (confirm("Are you sure you want to start a new game?")) {
        localStorage.clear();
        initializeGame();
    }
};
//# sourceMappingURL=pitch_count.js.map