module.exports = class StartTimerUseCase {

    constructor(roomService) {
        this.roomService = roomService;
    }

    execute({ roomId, userId }) {
        const room = this.roomService.getRoom(roomId);

        if (!room) {
            throw new Error('Room not found');
        }

        if (!room.isUserInRoom(userId)) {
            throw new Error('User is not in the room');
        }
    }
}