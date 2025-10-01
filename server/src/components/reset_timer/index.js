const ResetTimerUseCaseConstructor = require('./reset-timer.usecase');

const checkIfUserInRoomUseCase = require('../check_user_in_room');
const roomManagerInstance = require('../../services/room_manager');
const timerManagerInstance = require('../../services/timer_manager');

ResetTimerUseCaseConstructor._instance = ResetTimerUseCaseConstructor._instance || new ResetTimerUseCaseConstructor(checkIfUserInRoomUseCase, roomManagerInstance, timerManagerInstance);

module.exports = ResetTimerUseCaseConstructor._instance
