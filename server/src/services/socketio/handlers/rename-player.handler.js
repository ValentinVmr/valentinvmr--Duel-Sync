const useParser = require('../../utils/useParseData')();
const renamePlayerUseCase = require('../../../components/rename_player');
const log = require("npmlog");
const useBuildDto = require('../../utils/useBuildDto')();

module.exports = (socket, payload) => {
    const { roomId, playerId, newName } = useParser.parse(payload);
    const userId = socket.id;

    const room = renamePlayerUseCase.execute({roomId, userId, playerId, newName});

    const data = useBuildDto.playersDataDto(room);
    const payloadToSend =  JSON.stringify(data);

    log.info(`User ${userId} renamed player ${playerId} to ${newName} in room ${roomId}`);
    socket.emit('player-renamed', payloadToSend);
    socket.to(roomId).emit('player-renamed', payloadToSend);
}