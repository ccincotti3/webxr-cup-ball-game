const MODES = {
  INTRO: "intro",
  GAME: "game",
};

const SECONDS_TO_PLAY = 10;
const STARTING_ROPE_LENGTH = 5;

AFRAME.registerState({
  initialState: {
    score: 0,
    ropeLength: STARTING_ROPE_LENGTH,
    mode: MODES.INTRO,
    gameOver: true,
    timeStart: 0,
    timeElapsed: 0,
    timeRemaining: SECONDS_TO_PLAY,
    isRightHand: true,

    controllerConnected: false,
    showCupController: false,

    // game modes
    isIntro: true,
    isGame: false,

    debugOn: true,
  },

  handlers: {
    increaseScore: function (state, action) {
      state.score += 1;
    },
    setGameMode: function (state, action) {
      state.mode = action.mode;
    },
    setTimeElapsed: function (state, action) {
      state.timeElapsed = action.elapsed;
    },
    startGame: function (state) {
      state.mode = MODES.GAME;
      state.gameOver = false;
      state.score = 0;
      state.timeStart = state.timeElapsed;
      state.timeRemaining = SECONDS_TO_PLAY;
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
    newState.gameOver = newState.gameOver || newState.timeRemaining <= 0;

    // set mode
    newState.isIntro = newState.mode === MODES.INTRO;
    newState.isGame = newState.mode === MODES.GAME;
    newState.showCupController = !newState.gameOver;
    newState.ropeLength = newState.score + STARTING_ROPE_LENGTH
  },
});
