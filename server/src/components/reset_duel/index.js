const roomServiceInstance = require('../../services/room_manager');
const timerServiceInstance = require('../../services/timer_manager');
const checkUserInRoom = require('../check_user_in_room');
const ResetDuelUseCaseConstructor = require('./reset-duel.usecase');

ResetDuelUseCaseConstructor._instance = ResetDuelUseCaseConstructor._instance || new ResetDuelUseCaseConstructor(roomServiceInstance, checkUserInRoom, timerServiceInstance);

module.exports = ResetDuelUseCaseConstructor._instance
