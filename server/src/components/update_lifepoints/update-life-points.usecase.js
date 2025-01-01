module.exports = class UpdateLifePointsUseCase {

    constructor(roomService) {
        this.roomService = roomService;
    }

    execute(userId, roomId, playerId, operation, amount) {
        this.handleMandatoryFields(roomId, playerId, operation, amount);
        this.checkDataValidity(playerId, operation, amount);

        const room = this.roomService.getRoom(roomId);

        if (!room) {
            throw new Error('Room not found');
        }

        if (!room.isUserInRoom(userId)) {
            throw new Error('User is not in the room');
        }

        if (operation === 'add') {
            room.addLifePoints(playerId, amount);
        } else {
            room.removeLifePoints(playerId, amount);
        }

        this.roomService.update(roomId, room);
        return room;
    }

    handleMandatoryFields(room, playerId, operation, amount) {
        if (!room) {
            throw new Error('Room is required');
        }

        if (!playerId) {
            throw new Error('Player ID is required');
        }

        if (!operation) {
            throw new Error('Operation is required');
        }

        if (!amount) {
            throw new Error('Amount is required');
        }
    }

    checkDataValidity(playerId, operation, amount) {
        if (operation !== 'add' && operation !== 'sub') {
            throw new Error('Invalid operation');
        }

        if (isNaN(amount)) {
            throw new Error('Amount must be a number');
        }

        if (playerId !== 'player1' && playerId !== 'player2') {
            throw new Error('Invalid player ID');
        }
    }
}
