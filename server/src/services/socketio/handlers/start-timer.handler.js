const startTimerUseCase = require('../../../components/start_timer');
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
    const onTick = (room) => {
        const payload = JSON.stringify({timer: room.data.timer});
        socket.emit('timer-updated', payload);
        socket.to(roomId).emit('timer-updated', payload);
    }

    const onComplete = () => {
        socket.emit('timer-complete');
        socket.to(roomId).emit('timer-completed');
    }

    startTimerUseCase.execute({roomId, userId, onTickCallback: onTick, onCompleteCallback: onComplete});
    socket.to(roomId).emit('timer-started');
    socket.emit('timer-started');
    log.info(`User ${userId} started timer in room ${roomId}`);
}