const resetTimerUseCase = require('../../../components/reset_timer');
const log = require("npmlog");
const useParser = require('../../utils/useParseData')();

module.exports = (socket, payload) => {
    const {roomId} = useParser.parse(payload);
    const userId = socket.id;

    const newTimer = resetTimerUseCase.execute({roomId, userId});
    const payloadToSend = JSON.stringify({timer: newTimer});
    socket.to(roomId).emit('timer-updated', payloadToSend);
    socket.emit('timer-updated', payloadToSend);
    log.info(`User ${userId} reset timer in room ${roomId}`);
}