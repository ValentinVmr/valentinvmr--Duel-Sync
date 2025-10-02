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

        return this.resetDuelUseCase.execute({roomId, userId});
    }
}