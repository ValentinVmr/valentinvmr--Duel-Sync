const checkIfUserInRoomUseCase = require('../check_user_in_room');
const StartTimerUseCaseConstructor = require('./start-timer.usecase');
const roomManagerInstance = require('../../services/room_manager');
const timerManagerInstance = require('../../services/timer_manager');

StartTimerUseCaseConstructor._instance = StartTimerUseCaseConstructor._instance || new StartTimerUseCaseConstructor(checkIfUserInRoomUseCase, roomManagerInstance, timerManagerInstance);

module.exports = StartTimerUseCaseConstructor._instance
