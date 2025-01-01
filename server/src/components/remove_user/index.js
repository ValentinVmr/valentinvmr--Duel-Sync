const roomServiceInstance = require('../../services/room_manager');
const RemoveUserUseCaseConstructor = require('./remove-user.usecase');

RemoveUserUseCaseConstructor._instance = RemoveUserUseCaseConstructor._instance || new RemoveUserUseCaseConstructor(roomServiceInstance);

module.exports = RemoveUserUseCaseConstructor._instance
