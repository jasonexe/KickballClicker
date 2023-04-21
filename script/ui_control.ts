let updateUi = function(state: GameState) {
    // Update the UI fields to reflect the game state
    let awayScoreElement = document.getElementById("away_score");
    let awayTextElement = document.getElementById("away_text");
    let homeScoreElement = document.getElementById("home_score");
    let homeTextElement = document.getElementById("home_text");
    let inningElement = document.getElementById("inning");
    let ballsElement = document.getElementById("ball_count");
    let strikeElement = document.getElementById("strike_count");
    let foulElement = document.getElementById("foul_count");
    let outElement = document.getElementById("out_count");

    awayScoreElement.innerText = state.awayScore.toString();
    homeScoreElement.innerText = state.homeScore.toString();
    // TODO determine top/bottom of the innings
    let inningNumber = Math.floor(state.inning / 2) + 1;
    let inningIndicator = state.inning % 2 == 0 ? "△ " : "▽ ";
    inningElement.innerText = inningIndicator + inningNumber.toString();
    if (state.inning % 2 === 0) {
        // Top of the inning, it's away team
        awayTextElement.innerText = "Away ▲";
        homeTextElement.innerText = "Home";
    } else {
        homeTextElement.innerText = "Home ▲";
        awayTextElement.innerText = "Away";
    }

    ballsElement.innerText = state.ball.toString();
    strikeElement.innerText = state.strike.toString();
    foulElement.innerText = state.foul.toString();
    outElement.innerText = state.out.toString();
}