const roomServiceInstance = require('../../services/room_manager');
const UpdateLifePointsUseCaseConstructor = require('./update-life-points.usecase');

UpdateLifePointsUseCaseConstructor._instance = UpdateLifePointsUseCaseConstructor._instance || new UpdateLifePointsUseCaseConstructor(roomServiceInstance);

module.exports = UpdateLifePointsUseCaseConstructor._instance
