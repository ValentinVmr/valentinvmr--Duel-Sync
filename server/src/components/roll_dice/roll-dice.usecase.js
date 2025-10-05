module.exports = class RollDiceUseCase {

    constructor(checkIfUserInRoom) {
        this.checkIfUserInRoom = checkIfUserInRoom;
    }

    execute({ roomId, userId }) {
        this.checkIfUserInRoom.execute({roomId, userId});

        const dieResult = this.roll(1, 6);
        return { dieResult };
    }

    roll(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}