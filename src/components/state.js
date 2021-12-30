const MODES = {
  MENU: "menu",
  PLAY: "play",
};

const SECONDS_TO_PLAY = 60;

AFRAME.registerState({
  initialState: {
    score: 0,
    mode: MODES.MENU,
    gameOver: false,
    timeStart: 0,
    timeElapsed: 0,
    timeRemaining: SECONDS_TO_PLAY,
  },

  handlers: {
    increaseScore: function (state, action) {
      state.score += action.points;
    },
    setGameMode: function (state, action) {
      state.mode = action.mode;
    },
    setTimeElapsed: function (state, action) {
      state.timeElapsed = action.elapsed;
    },
  },
  computeState: function (newState, payload) {
    newState.timeRemaining =
      newState.gameOver || newState.timeRemaining <= 0
        ? 0
        : Math.floor(
            SECONDS_TO_PLAY - (newState.timeElapsed - newState.timeStart) / 1000
          );
    newState.gameOver = newState.timeRemaining <= 0;
  },
});
