// Stores all the state of the game 
class GameState {
    constructor() {
        this.awayScore = 0;
        this.homeScore = 0;
        // Inning starts at 0 representing top of the 1st. 1 = bottom of the 1st.
        // 2 = top of the second.
        // Simple algo: inning/2 + 1 = current inning.
        // inning%2 = 0, top. = 1, bottom
        // Away team bats at the top of the inning
        this.inning = 0;
        this.ball = 0;
        this.strike = 0;
        this.foul = 0;
        this.out = 0;
    }
}
// Note: Not making these class functions of GameState because it makes using LocalStorage harder
let updateState = function (existingState, action) {
    let newState = new GameState();
    fillState(newState, existingState);
    switch (action) {
        case Action.STRIKE:
            newState.strike += 1;
            checkForOuts(newState);
            break;
        case Action.BALL:
            newState.ball += 1;
            checkForOuts(newState);
            break;
        case Action.FOUL:
            newState.foul += 1;
            checkForOuts(newState);
            break;
        case Action.OUT:
            newState.out += 1;
            resetCount(newState);
            checkForOuts(newState);
            break;
        case Action.RUNNER_SCORED:
            // Check which side is up, increment their score
            if (newState.inning % 2 === 0) {
                newState.awayScore += 1;
            }
            else {
                newState.homeScore += 1;
            }
            break;
        case Action.KICKER_SAFE:
            newState.strike = 0;
            newState.ball = 0;
            newState.foul = 0;
            break;
        case Action.TOGGLE_CLOCK:
            // Start or pause timer
            break;
    }
    checkForOuts(newState);
    updateUi(newState);
    return newState;
};
let checkForOuts = function (state) {
    // If foul >= 3, increment out
    // If strike >= 3, increment out
    // If ball >= 4, reset count
    // If out >= 3, switch sides.
    if (state.foul >= 3 || state.strike >= 3) {
        state.out += 1;
        resetCount(state);
    }
    if (state.ball >= 4) {
        resetCount(state);
    }
    if (state.out >= 3) {
        state.inning += 1;
        state.out = 0;
        resetCount(state);
    }
    updateUi(state);
};
let resetCount = function (state) {
    state.strike = 0;
    state.ball = 0;
    state.foul = 0;
};
/**
 * Method to duplicate one GameState into another. Basically to create a deep copy
 * @param stateToFill The GameState that the existing state should be duplicated into
 * @param existingState The GameState that we want to alter
 */
let fillState = function (stateToFill, existingState) {
    stateToFill.awayScore = existingState.awayScore;
    stateToFill.homeScore = existingState.homeScore;
    stateToFill.inning = existingState.inning;
    stateToFill.ball = existingState.ball;
    stateToFill.strike = existingState.strike;
    stateToFill.foul = existingState.foul;
    stateToFill.out = existingState.out;
};
//# sourceMappingURL=game_state.js.map