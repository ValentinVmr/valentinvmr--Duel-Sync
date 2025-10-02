const useParser = require('../../utils/useParseData')();
const updateConfigurationUseCase = require('../../../components/update_configuration');
const log = require("npmlog");
const useBuildDto = require('../../utils/useBuildDto')();

module.exports = (socket, data) => {
    const { roomId, configuration } = useParser.parse(data);

    const userId = socket.id;

    const room = updateConfigurationUseCase.execute({ roomId, userId, configuration });
    const roomDto = useBuildDto.roomDto(room);

    const payloadToSend =  JSON.stringify(roomDto);
    socket.to(roomId).emit('configuration-updated', payloadToSend);
    socket.emit('configuration-updated', payloadToSend);
    log.info(`User ${userId} updated configuration in room ${roomId}`);
}