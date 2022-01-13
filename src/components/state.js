const MODES = {
  INTRO: "intro",
  GAME: "game",
};

const SECONDS_TO_PLAY = 60;

AFRAME.registerState({
  initialState: {
    score: 0,
    mode: MODES.INTRO,
    gameOver: false,
    timeStart: 0,
    timeElapsed: 0,
    timeRemaining: SECONDS_TO_PLAY,
    isRightHand: true,

    controllerConnected: false,

    // game modes
    isIntro: true,
    isGame: false,

    debugOn: true,
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
    startGame: function (state) {
      state.mode = MODES.GAME;
    },
    enableControllerControls: function (state) {
      state.controllerConnected = true;
    },
    chooseHandLeft: function (state) {
      state.isRightHand = false;
    },
    chooseHandRight: function (state) {
      state.isRightHand = true;
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

    // set mode
    newState.isIntro = newState.mode === MODES.INTRO;
    newState.isGame = newState.mode === MODES.GAME;
  },
});
