const resetDuelUseCase = require('../../../components/reset_duel');
const log = require("npmlog");
const useBuildDto = require('../../utils/useBuildDto')();
const useParser = require('../../utils/useParseData')();

module.exports = (socket, payload) => {
    const {roomId} = useParser.parse(payload);
    const userId = socket.id;

    const room = resetDuelUseCase.execute({roomId, userId});
    const data = useBuildDto.roomDto(room);

    const payloadToSend =  JSON.stringify(data);
    socket.to(roomId).emit('duel-reset', payloadToSend);
    socket.emit('duel-reset', payloadToSend);
    log.info(`User ${userId} reset duel in room ${roomId}`);
}