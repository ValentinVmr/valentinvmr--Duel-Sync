const resetDuelUseCase = require('../../../components/reset_duel');
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

    const room = resetDuelUseCase.execute({roomId, userId});

    console.log(room)
    const data = {
        playersData: room.data,
        roomId: roomId,
        timer: room.getTimer(),
        configuration: room.getConfiguration()
    }

    const payloadToSend =  JSON.stringify(data);
    socket.to(roomId).emit('duel-reset', payloadToSend);
    socket.emit('duel-reset', payloadToSend);
    log.info(`User ${userId} reset duel in room ${roomId}`);
}