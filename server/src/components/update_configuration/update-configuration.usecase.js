module.exports = class UpdateConfigurationUseCase {
    constructor(roomManager, checkUserInRoom, resetDuelUseCase) {
        this.roomManager = roomManager;
        this.checkUserInRoom = checkUserInRoom;
        this.resetDuelUseCase = resetDuelUseCase;
    }

    execute({roomId, userId, configuration}) {
        this.checkUserInRoom.execute({roomId, userId});

        const room = this.roomManager.getRoom(roomId);
        room.updateConfiguration(configuration);

        this.resetDuelUseCase.execute({roomId, userId});

        this.roomManager.update(roomId, room);
        return room;
    }
}