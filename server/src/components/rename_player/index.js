const RoomManager = require('../../services/room_manager');
const checkUserInRoom = require('../check_user_in_room');
const RenamePlayerUseCaseConstructor = require('./rename-player.usecase');

RenamePlayerUseCaseConstructor._instance = RenamePlayerUseCaseConstructor._instance || new RenamePlayerUseCaseConstructor(RoomManager, checkUserInRoom);

module.exports = RenamePlayerUseCaseConstructor._instance;