const RoomServiceInstance = require('../../services/room_manager')
const CheckUserInRoomUseCaseConstructor = require('./check-user-in-room.usecase');

CheckUserInRoomUseCaseConstructor._instance = CheckUserInRoomUseCaseConstructor._instance || new CheckUserInRoomUseCaseConstructor(RoomServiceInstance);

module.exports = CheckUserInRoomUseCaseConstructor._instance