const {
    createRoomHandler,
    removeUserHandler,
    updateLifePointsHandler
} = require('./handlers')

module.exports = (socket) => {
    socket.on('join-room', (roomId) => createRoomHandler(socket, roomId));
    socket.on('update-life-points', (data) => updateLifePointsHandler(socket, data));
    socket.on('disconnecting', removeUserHandler);
}
