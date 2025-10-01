const resetTimerUseCase = require('../../../components/reset_timer');
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

    const newTimer = resetTimerUseCase.execute({roomId, userId});
    const payloadToSend = JSON.stringify({timer: newTimer});
    socket.to(roomId).emit('timer-updated', payloadToSend);
    socket.emit('timer-updated', payloadToSend);
    log.info(`User ${userId} reset timer in room ${roomId}`);
}