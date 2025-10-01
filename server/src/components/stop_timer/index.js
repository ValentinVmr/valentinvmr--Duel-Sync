const checkIfUserInRoomUseCase = require('../check_user_in_room');
const StopTimerUseCaseConstructor = require('./stop-timer.usecase');
const timerManagerInstance = require('../../services/timer_manager');

StopTimerUseCaseConstructor._instance = StopTimerUseCaseConstructor._instance || new StopTimerUseCaseConstructor(checkIfUserInRoomUseCase, timerManagerInstance);

module.exports = StopTimerUseCaseConstructor._instance
