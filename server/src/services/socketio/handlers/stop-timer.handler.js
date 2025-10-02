const stopTimerUseCase = require('../../../components/stop_timer');
const log = require("npmlog");
const useParser = require('../../utils/useParseData')();

module.exports = (socket, payload) => {
    const {roomId} = useParser.parse(payload);
    const userId = socket.id;

    stopTimerUseCase.execute({roomId, userId});
    socket.to(roomId).emit('timer-stopped');
    socket.emit('timer-stopped');
    log.info(`User ${userId} stopped timer in room ${roomId}`);
}