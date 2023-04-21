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
let pastStates;
// This gets cleared after something other than undo happens
let undoneStates;
let currentState;
let countdownTimer;
let initializeGame = function () {
    currentState = new GameState();
    pastStates = new Array();
    undoneStates = new Array();
    // 2700000 MS = 45 minutes
    countdownTimer = new PausableCountdownTimer(2700000);
};
let undo = function () {
    if (pastStates.length === 0) {
        return;
    }
    undoneStates.push(currentState);
    currentState = pastStates.pop();
    updateUi(currentState);
};
let redo = function () {
    if (undoneStates.length === 0) {
        return;
    }
    pastStates.push(currentState);
    currentState = undoneStates.pop();
    updateUi(currentState);
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
};
//# sourceMappingURL=pitch_count.js.map