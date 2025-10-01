const UpdateConfigurationConstructor = require('./update-configuration.usecase')
const RoomManagerService = require('../../services/room_manager')
const CheckIfUserInRoomUseCase = require('../check_user_in_room')
const ResetDuelUseCase = require('../reset_duel')

UpdateConfigurationConstructor._instance = UpdateConfigurationConstructor._instance || new UpdateConfigurationConstructor(RoomManagerService, CheckIfUserInRoomUseCase, ResetDuelUseCase);

module.exports = UpdateConfigurationConstructor._instance;



