const createRoomHandler = require('./create-room.handler');
const removeUserHandler = require('./remove-user.handler');
const updateLifePointsHandler = require('./update-lifepoints.handler');
const startTimer = require('./start-timer.handler');
const stopTimer = require('./stop-timer.handler');
const resetTimer = require('./reset-timer.handler');
const resetDuel = require('./reset-duel.handler');

module.exports = {
    createRoomHandler,
    removeUserHandler,
    updateLifePointsHandler,
    startTimer,
    stopTimer,
    resetTimer,
    resetDuel
}
