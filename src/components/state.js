import CONFIG from "../constants/config";

AFRAME.registerState({
  initialState: {
    score: 0,
    leftRopeLength: CONFIG.STARTING_ROPE_LENGTH,
    rightRopeLength: CONFIG.STARTING_ROPE_LENGTH,
    mode: CONFIG.MODES.INTRO,
    gameOver: true,
    timeStart: 0,
    timeElapsed: 0,
    timeRemaining: CONFIG.SECONDS_TO_PLAY,

    controllerConnected: false,
    showCup: false,

    // game modes
    isIntro: true,
    isGame: false,

    debugOn: true,
  },

  handlers: {
    rightPlaneHit: function (state, evt) {
      if (evt.targetEl.id !== "rightBall") {
        return;
      }
      state.score++;
      if (state.rightRopeLength < CONFIG.MAX_ROPE_LENGTH) {
        state.rightRopeLength++;
      }
    },
    leftPlaneHit: function (state) {
      if (evt.targetEl.id !== "leftBall") {
        return;
      }
      state.score++;
      if (state.leftRopeLength < CONFIG.MAX_ROPE_LENGTH) {
        state.leftRopeLength++;
      }
    },
    setGameMode: function (state, action) {
      state.mode = action.mode;
    },
    // This is lazy and I'm not sure the best way to handle time
    setTimeElapsed: function (state, action) {
      state.timeElapsed = action.elapsed;
    },
    startGame: function (state) {
      state.mode = CONFIG.MODES.GAME;
      state.gameOver = false;
      state.score = 0;
      state.timeStart = state.timeElapsed;
      state.timeRemaining = CONFIG.SECONDS_TO_PLAY;
      state.leftRopeLength = CONFIG.STARTING_ROPE_LENGTH;
      state.rightRopeLength = CONFIG.STARTING_ROPE_LENGTH;
    },
    enableControllerControls: function (state) {
      state.controllerConnected = true;
    },
  },
  computeState: function (newState, payload) {
    newState.timeRemaining =
      newState.gameOver || newState.timeRemaining <= 0
        ? 0
        : Math.ceil(
            CONFIG.SECONDS_TO_PLAY -
              (newState.timeElapsed - newState.timeStart) / 1000
          );
    newState.gameOver = newState.gameOver || newState.timeRemaining <= 0;

    // set mode
    newState.isIntro = newState.mode === CONFIG.MODES.INTRO;
    newState.isGame = newState.mode === CONFIG.MODES.GAME;
    newState.showCup = !newState.gameOver;
  },
});
