const stopTimerUseCase = require('../../../components/stop_timer');
const log = require("npmlog");

module.exports = (socket, payload) => {
    var parseData;

    try {
        parseData = JSON.parse(payload || "{}");
    } catch (error) {
        log.error(error);
        return;
    }

    const {roomId} = parseData;
    const userId = socket.id;

    stopTimerUseCase.execute({roomId, userId});
    socket.to(roomId).emit('timer-stopped');
    socket.emit('timer-stopped');
    log.info(`User ${userId} stopped timer in room ${roomId}`);
}