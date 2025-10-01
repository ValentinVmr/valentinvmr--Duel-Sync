const {
    createRoomHandler,
    removeUserHandler,
    updateLifePointsHandler,
    startTimer,
    stopTimer,
    resetTimer
} = require('./handlers')

module.exports = (socket) => {
    socket.on('join-room', (roomId) => createRoomHandler(socket, roomId));
    socket.on('update-life-points', (data) => updateLifePointsHandler(socket, data));
    socket.on('start-timer', (data) => startTimer(socket, data))
    socket.on('stop-timer', (data) => stopTimer(socket, data))
    socket.on('reset-timer', (data) => resetTimer(socket, data))
    socket.on('disconnecting', removeUserHandler);
}
