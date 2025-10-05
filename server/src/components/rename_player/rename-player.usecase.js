module.exports = class RenamePlayerUseCase {
    constructor(roomManager, checkUserInRoom) {
        this.roomManager = roomManager;
        this.checkUserInRoom = checkUserInRoom;
    }

    execute({roomId, userId, playerId, newName}) {
        this.checkUserInRoom.execute({roomId, userId});

        const room = this.roomManager.getRoom(roomId);
        room.renamePlayer(playerId, newName);
        this.roomManager.update(roomId, room);

        return room;
    }
}