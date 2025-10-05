const createRoomHandler = require('./create-room.handler');
const removeUserHandler = require('./remove-user.handler');
const updateLifePointsHandler = require('./update-lifepoints.handler');
const startTimer = require('./start-timer.handler');
const stopTimer = require('./stop-timer.handler');
const resetTimer = require('./reset-timer.handler');
const resetDuel = require('./reset-duel.handler');
const updateConfiguration = require('./update-configuration.handler');
const renamePlayer = require('./rename-player.handler');
const rollDice = require('./roll-dice.handler');

module.exports = {
    createRoomHandler,
    removeUserHandler,
    updateLifePointsHandler,
    startTimer,
    stopTimer,
    resetTimer,
    resetDuel,
    updateConfiguration,
    renamePlayer,
    rollDice
}
