const roomServiceInstance = require('../../services/room_manager');
const JoinRoomUseCaseConstructor = require('./join-room.usecase');

JoinRoomUseCaseConstructor._instance = JoinRoomUseCaseConstructor._instance || new JoinRoomUseCaseConstructor(roomServiceInstance);

module.exports = JoinRoomUseCaseConstructor._instance
